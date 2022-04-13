import * as auth from "firebase/auth";

const useLogin = () => {
  const onClick = (email: string, password: string) => {
    return auth
      .signInWithEmailAndPassword(auth.getAuth(), email, password)
      .then(console.log)
      .catch(console.error);
  };
  return onClick;
};

export default useLogin;
