import { logger } from 'firebase-functions/v1';
import * as functions from 'firebase-functions/v1';

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
