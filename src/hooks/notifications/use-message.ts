import { useCallback } from 'react';
import fpUtils from '@/utils/fp-utils';
import { AxiosError } from 'axios';
import { ApiError } from '@/interfaces/shared/api-error';
import { useNotifications } from '@mantine/notifications';

const errorProps = {
  title: 'Error',
  color: 'red',
};

const useMessage = () => {
  const notifications = useNotifications();
  return {
    showSuccess: useCallback(
      (message: string) => {
        notifications.showNotification({
          title: 'Success',
          message,
          color: 'green',
        });
      },
      [notifications],
    ),
    showError: useCallback(
      (error: AxiosError<ApiError> | string) => {
        if (typeof error === 'string') {
          notifications.showNotification({
            ...errorProps,
            message: error,
          });
        } else {
          const def = 'An error occurred';
          const msg = fpUtils
            .match(error)
            .on(
              (err) => err.isAxiosError,
              (err) => err.response?.data?.message ?? def,
            )
            .otherwise(() => def);
          notifications.showNotification({
            ...errorProps,
            message: msg,
          });
        }
      },
      [notifications],
    ),
  };
};

export default useMessage;
