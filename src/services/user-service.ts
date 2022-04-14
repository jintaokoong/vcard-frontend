import { InviteUserRequest } from '@/interfaces/users/invite-user';
import axiosInstance from '@/configurations/axios';

const inviteUser = (payload: InviteUserRequest) =>
  axiosInstance.post('/users/invite', payload).then(({ data }) => data);

const deleteUser = (id: string) =>
  axiosInstance.delete(`/users/${id}`).then(({ data }) => data);

const userService = { inviteUser, deleteUser };

export default userService;
