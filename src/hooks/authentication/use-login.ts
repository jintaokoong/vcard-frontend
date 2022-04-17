import * as auth from 'firebase/auth';

const useLogin = () => {
  const onClick = (email: string, password: string) => {
    return auth.signInWithEmailAndPassword(auth.getAuth(), email, password);
  };
  return onClick;
};

export default useLogin;
