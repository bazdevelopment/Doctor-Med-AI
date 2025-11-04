import { logger } from 'firebase-functions/v1';
import * as functions from 'firebase-functions/v1';

import {
  getAllConversationsHandler,
  getConversationHandler,
} from './conversation';
import * as pushNotificationsFunctions from './push-notifications';
import * as userFunctions from './user';

const usCentralFunctions = functions.region('us-central1');

export const getHelloWorld = usCentralFunctions.https.onCall(
  (data, context) => {
    logger.info('Hello logs!', { structuredData: true });
    const req = context.rawRequest;
    const authorizationHeader = req.get('Authorization');
    if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
      throw new functions.https.HttpsError(
        'unauthenticated',
        'The function must be called while authenticated.'
      );
    }
    return { message: data }; // Return a JSON response
  }
);

export const loginUserAnonymously = functions.https.onCall(
  userFunctions.loginUserAnonymouslyHandler
);

export const updateUserSubscription = usCentralFunctions.https.onCall(
  userFunctions.updateUserSubscription
);

export const updateUser = usCentralFunctions.https.onCall(
  userFunctions.updateUser
);
export const grantFreeScansForEligibleUsers = usCentralFunctions.https.onCall(
  userFunctions.grantFreeScansForEligibleUsersHandler
);

export const getUserInfo = usCentralFunctions.https.onCall(
  userFunctions.getUserInfo
);

export const updatePreferredLanguage = usCentralFunctions.https.onCall(
  userFunctions.handleUpdateUserLanguage
);

export const getConversation = usCentralFunctions.https.onCall(
  getConversationHandler
);

export const getAllConversations = usCentralFunctions.https.onCall(
  getAllConversationsHandler
);
// Notifications & Device push notificaiton token

export const storeDeviceToken = usCentralFunctions.https.onCall(
  pushNotificationsFunctions.storeDeviceToken
);

export const getDeviceInfoByUniqueIdentifier =
  usCentralFunctions.https.onRequest(
    pushNotificationsFunctions.checkDeviceUniqueIdentifier
  );

export const sendGlobalPushNotifications = usCentralFunctions.https.onCall(
  pushNotificationsFunctions.handleSendGlobalPushNotifications
);
export const sendIndividualPushNotification = usCentralFunctions.https.onCall(
  pushNotificationsFunctions.sendUserPushNotification
);

export const fetchUserNotifications = usCentralFunctions.https.onCall(
  pushNotificationsFunctions.handleGetUserNotification
);

export const markNotificationAsRead = usCentralFunctions.https.onCall(
  pushNotificationsFunctions.handleMarkNotificationAsRead
);
