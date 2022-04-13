import * as auth from "firebase/auth";

const useLogout = () => {
  const onClick = () => {
    auth.signOut(auth.getAuth());
  };
  return onClick;
};

export default useLogout;
