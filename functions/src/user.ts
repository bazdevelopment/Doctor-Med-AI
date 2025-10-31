/* eslint-disable max-lines-per-function */
import * as functions from 'firebase-functions/v1';

import { admin } from './common';
import { getTranslation } from './translations';

const db = admin.firestore();

const loginUserAnonymouslyHandler = async (data: {
  language: string;
  username: string;
  actualUserId?: string; // Optional: The existing userId to check
}) => {
  let t;
  try {
    t = getTranslation(data.language);

    // Validate username
    if (!data.username) {
      throw new functions.https.HttpsError(
        'invalid-argument',
        t.loginUserAnonymously.mandatoryUsername
      );
    }

    const db = admin.firestore();

    // let userId: string;
    let isNewUser = false;

    // Step 1: Check if actualUserId is provided and corresponds to an existing user
    if (data.actualUserId) {
      const existingUserDoc = await db
        .collection('users')
        .doc(data.actualUserId)
        .get();
      if (existingUserDoc.exists) {
        // Update the existing user's username
        await db.collection('users').doc(data.actualUserId).update({
          userName: data.username, // Update the username
          updatedAt: admin.firestore.FieldValue.serverTimestamp(), // Update the timestamp
        });
        // Return the existing user's data
        const customToken = await admin
          .auth()
          .createCustomToken(data.actualUserId);
        return {
          userId: data.actualUserId,
          message: t.loginUserAnonymously.userLoggedIn,
          isNewUser: false,
          authToken: customToken,
        };
      }
    }

    // Step 2: If no existing user is found, create a new anonymous user
    const createdUser = await admin.auth().createUser({
      // No email or password needed for anonymous users
    });

    const newUserId = createdUser.uid;

    // Step 3: Create a new user document in Firestore
    await db
      .collection('users')
      .doc(newUserId)
      .set({
        userId: newUserId,
        isAnonymous: true, // Mark the user as anonymous
        scansRemaining: 1, // Example field
        subscribed: false, // Example field
        isActive: false, // Example field
        isOnboarded: false, // Example field
        userName: data.username, // Store the provided username
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
        preferredLanguage: data.language || 'en', // Use the provided language or default to 'en'
        completedScans: 0, // Example field
      });

    isNewUser = true;

    // Step 4: Generate a custom token for the user
    const customToken = await admin.auth().createCustomToken(newUserId);
    return {
      userId: newUserId,
      message: isNewUser
        ? t.loginUserAnonymously.accountCreated
        : t.loginUserAnonymously.userLoggedIn,
      isNewUser,
      authToken: customToken,
    };
  } catch (error: any) {
    t = t || getTranslation('en');

    console.error('Anonymous login error:', error);
    if (error instanceof functions.https.HttpsError) {
      throw error;
    }

    throw new functions.https.HttpsError(
      'internal',
      t.loginUserAnonymously.error,
      { message: error.message || 'Unknown error occurred.' }
    );
  }
};

const updateUserSubscription = async (data: {
  userId: string;
  language: string;
}) => {
  let t;
  try {
    const { userId, language } = data;
    const userDoc = db.collection('users').doc(userId);
    t = getTranslation(language);

    await userDoc.update({ subscribed: true, maxScans: 200 });

    return { message: t.updateUserSubscription.subscribeSuccess };
  } catch (error: any) {
    t = t || getTranslation('en');

    throw new functions.https.HttpsError(error.code, error.message, {
      message:
        error.message || t?.updateUserSubscription.updateSubscriptionError,
    });
  }
};

const updateUser = async (data: {
  userId: string;
  language: string;
  fieldsToUpdate: object;
}) => {
  let t;
  try {
    const { userId, language } = data;
    const userDoc = db.collection('users').doc(userId);
    t = getTranslation(language);

    await userDoc.update(data.fieldsToUpdate);

    return { message: t.updateUser.successUpdatedUser };
  } catch (error: any) {
    t = t || getTranslation('en');

    throw new functions.https.HttpsError(error.code, error.message, {
      message: error.message || t?.updateUser.updateUserError,
    });
  }
};

const handleUpdateUserLanguage = async (
  data: { language: string },
  context: any
) => {
  let t;
  try {
    const { language } = data;
    t = getTranslation(language);
    // Ensure user is authenticated
    if (!context.auth) {
      throw new functions.https.HttpsError(
        'unauthenticated',
        t.common.noUserFound
      );
    }
    if (!language) {
      throw new functions.https.HttpsError(
        'invalid-argument',
        'Language code is mandatory'
      );
    }
    const uid = context.auth?.uid;
    const userDoc = db.collection('users').doc(uid);

    await userDoc.update({ preferredLanguage: language });

    return { message: t.updateUserLanguage.updateSuccess, language };
  } catch (error: any) {
    t = t || getTranslation('en');

    throw new functions.https.HttpsError(
      'internal',
      t.updateUserLanguage.updateError
    );
  }
};

const getUserInfo = async (data: { language: string }, context: any) => {
  let t;
  try {
    t = getTranslation(data.language);

    // Ensure user is authenticated
    if (!context.auth) {
      throw new functions.https.HttpsError(
        'unauthenticated',
        t.common.noUserFound
      );
    }
    const userId = context.auth?.uid;
    const userInfoData = await getUserInfoById(userId, data.language);
    return {
      ...userInfoData,
      createdAt: userInfoData?.createdAt?.toDate()?.toISOString(),
      updatedAt: userInfoData?.updatedAt?.toDate()?.toISOString(),
      message: t.getUserInfo.successGetInfo,
    };
  } catch (error: any) {
    t = t || getTranslation('en');
    throw new functions.https.HttpsError(
      'internal',
      t.getUserInfo.errorGetInfo
    );
  }
};

const getUserInfoById = async (
  userId: string,
  language: string
): Promise<any> => {
  let t;
  try {
    t = getTranslation(language);

    // Check if userId is valid
    if (!userId) {
      throw new functions.https.HttpsError(
        'invalid-argument',
        t.common.userIdMissing
      );
    }

    // Fetch the user info from the database or service
    const userInfoData = await db.collection('users').doc(userId).get();
    // Ensure user data is not null/undefined
    if (!userInfoData.exists) {
      throw new functions.https.HttpsError(
        'data-loss',
        t.getUserInfoById.noUserInfoData
      );
    }

    // Return the user info data
    return userInfoData.data();
  } catch (error: any) {
    t = t || getTranslation('en');

    // Handle errors and rethrow as HttpsError for consistency
    if (error instanceof functions.https.HttpsError) {
      throw error; // Rethrow known HttpsError
    }

    // Log the error for debugging purposes
    console.error('Error fetching user info:', error);

    // Throw a generic error for unexpected issues
    throw new functions.https.HttpsError(
      'unknown',
      t.getUserInfoById.getUserFetchError,
      { details: error.message }
    );
  }
};

// Alternative batch function to process multiple users at once
const grantFreeScansForEligibleUsersHandler = async (
  data: any,
  context: any
) => {
  try {
    if (!context.auth) {
      throw new functions.https.HttpsError(
        'unauthenticated',
        'You need to be authenticated'
      );
    }

    const db = admin.firestore();
    const limit = 450; // Default limit of 500 users per batch (Firestore's max)

    // Step 1: Query users who qualify for free scans
    const usersQuery = await db
      .collection('users')
      .where('scansRemaining', '<=', 0)
      .limit(limit)
      .get();

    const batch = db.batch();
    const processedUsers: string[] = [];

    // Step 2: Filter users with empty activeSubscriptionsRevenue and prepare batch updates
    for (const userDoc of usersQuery.docs) {
      const userData = userDoc.data();
      const activeSubscriptionsRevenue =
        userData.activeSubscriptionsRevenue || [];

      // Only process users with no active subscriptions
      if (activeSubscriptionsRevenue.length === 0) {
        batch.update(userDoc.ref, {
          scansRemaining: 2,
          updatedAt: admin.firestore.FieldValue.serverTimestamp(),
        });
        processedUsers.push(userDoc.id);
      }
    }

    // Step 3: Execute batch update
    if (processedUsers.length > 0) {
      await batch.commit();
    }

    return {
      message: 'Batch free scans granted successfully',
      usersProcessed: processedUsers.length,
      userIds: processedUsers,
      scansGrantedPerUser: 2,
      success: true,
    };
  } catch (error: any) {
    console.error('Batch grant free scans error:', error);
    return error.message;
  }
};

export {
  getUserInfo,
  getUserInfoById,
  grantFreeScansForEligibleUsersHandler,
  handleUpdateUserLanguage,
  loginUserAnonymouslyHandler,
  updateUser,
  updateUserSubscription,
};
