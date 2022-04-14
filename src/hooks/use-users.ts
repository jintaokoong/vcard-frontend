import axiosInstance from '@/configurations/axios';
import { useQuery } from 'react-query';

interface User {
  uid: string;
  email: string;
  customClaims?: {
    admin: boolean;
  };
}

const useUsers = () => {
  return useQuery(['users'], () =>
    axiosInstance.get<{ users: User[] }>('/users').then(({ data }) => data),
  );
};

export default useUsers;
