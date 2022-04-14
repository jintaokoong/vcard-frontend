import { useMutation, useQueryClient } from 'react-query';
import userService from '@/services/user-service';

const useInviteUser = () => {
  const queryClient = useQueryClient();
  return useMutation(['invite-user'], userService.inviteUser, {
    onSuccess: () => {
      queryClient.invalidateQueries(['users']);
    },
  });
};

export default useInviteUser;
