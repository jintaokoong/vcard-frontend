import { useMutation, useQueryClient } from 'react-query';
import userService from '@/services/user-service';

const useDeleteUser = () => {
  const queryClient = useQueryClient();
  return useMutation(['delete-user'], userService.deleteUser, {
    onSuccess: () => {
      queryClient.invalidateQueries(['users']);
    },
  });
};

export default useDeleteUser;
