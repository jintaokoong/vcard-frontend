import * as auth from 'firebase/auth';
import useStore from '@/state/store';

const useLogin = () => {
  const setRole = useStore((s) => s.auth.setRole);
  const onClick = (email: string, password: string) => {
    return auth
      .signInWithEmailAndPassword(auth.getAuth(), email, password)
      .then(console.log)
      .catch(console.error);
  };
  return onClick;
};

export default useLogin;
