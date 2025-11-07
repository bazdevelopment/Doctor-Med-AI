import { type AxiosError } from 'axios';
import { router } from 'expo-router';
import { createMutation, createQuery } from 'react-query-kit';

import Toast from '@/components/toast';
import { translate } from '@/lib';
import { Env } from '@/lib/env';
import { useCrashlytics } from '@/lib/hooks/use-crashlytics';
import { wait } from '@/utilities/wait';

import {
  createAnonymousAccount,
  decrementNumberOfScans,
  getUserInfo,
  grantFreeScans,
  loginWithEmail,
  sendOtpCodeViaEmail,
  updateUserInfo,
  updateUserPreferredLanguage,
  validateVerificationCode,
} from './user.requests';
import { queryClient } from '../common';

type Response = any;

interface ISendOtpCodeVariables {
  email: string;
  language: string;
}

interface IValidateAuthCode {
  authenticationCode: string;
  email: string;
  language: string;
}

export const useCreateAnonymousAccount = (
  onSuccessHandler: (userId: string) => void
) =>
  createMutation<Response, { language: string; username: string }, AxiosError>({
    mutationFn: (variables) => createAnonymousAccount(variables),
    onSuccess: (data) => {
      onSuccessHandler(data.user.uid);
      queryClient.setQueryData(['user-info'], (oldData: IUserInfo) => ({
        ...oldData,
        userId: data.user.uid,
      }));
      Toast.success(data.message);
      //add a small delay to display the toast message
      wait(2000).then(() => router.navigate('/(app)'));
    },
    onError: (error) => {
      Toast.error(error.message || translate('alerts.anonymousSignInError'));
    },
  })();

export const useUser = (language: string) =>
  createQuery<Response, any, AxiosError>({
    queryKey: ['user-info'], // Include variables in the queryKey
    fetcher: () => getUserInfo({ language }), // Pass variables to the fetcher function
  })();

export const useDecrementScans = () => {
  const { logEvent, recordError } = useCrashlytics();

  return createMutation<Response, { language: string }, AxiosError>({
    mutationFn: (variables) => decrementNumberOfScans(variables),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-info'] });
      logEvent('The number of scans has been decremented');
    },
    onError: (error) => {
      Toast.error(error.message || translate('alerts.validateAuthCodeError'));
      logEvent('Failed to decrement the number of scans, "error');
      recordError(error, 'Failed to decrement the number of scans');
    },
  })();
};

export const useUserPreferredLanguage = () => {
  const { logEvent, recordError } = useCrashlytics();

  return createMutation<Response, { language: string }, AxiosError>({
    mutationFn: (variables) => updateUserPreferredLanguage(variables),
    onSuccess: () => {
      logEvent('Preferred language saved successfully');
    },
    onError: (error) => {
      Toast.error(error.message || translate('alerts.preferredLanguageError'));
      recordError(error, 'Error on saving the preferred user language');
    },
  })();
};

export const useUpdateUser = () => {
  const { logEvent, recordError } = useCrashlytics();

  return createMutation<
    Response,
    { language: string; userId: string; fieldsToUpdate: object },
    AxiosError
  >({
    mutationFn: (variables) => updateUserInfo(variables),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-info'] });
      logEvent(`Successfully updated user with the new fields`, 'info');
    },
    onError: (error) => {
      Toast.error(error?.message || translate('alerts.preferredLanguageError'));
      logEvent(`Error when the user is updated with new fields`, 'error');
      recordError(error, 'Error when the user is updated with new fields');
    },
  })();
};

export const useGrantFreeScans = () => {
  return createMutation<Response, void, AxiosError>({
    mutationFn: grantFreeScans,
    onSuccess: () => {},
    onError: (error) => {
      Toast.error(error?.message || 'error to grant more scans');
    },
  })();
};
