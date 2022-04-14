import { User } from 'firebase/auth';
import { createContext, PropsWithChildren, useEffect, useState } from 'react';
import * as auth from 'firebase/auth';
import useStore from '@/state/store';

export const AuthenticationContext = createContext<{
  user: User | null;
  hydrated: boolean;
}>({
  user: null,
  hydrated: false,
});

const AuthenticationProvider = ({ children }: PropsWithChildren<any>) => {
  const [hydrated, setHydrated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const setRole = useStore((s) => s.auth.setRole);

  useEffect(() => {
    if (user) {
      user.getIdTokenResult().then((res) => {
        setRole(res.claims.admin ? 'ADMIN' : 'USER');
      });
    } else {
      setRole('ANON');
    }
  }, [user]);

  useEffect(() => {
    const sub = auth.onAuthStateChanged(
      auth.getAuth(),
      (user) => {
        setUser(user);
        setHydrated((value) => (!value ? true : value));
      },
      (error) => {
        console.error(error);
        setUser(null);
        setHydrated((value) => (!value ? true : value));
      },
    );
    return () => {
      sub();
    };
  }, []);

  return (
    <AuthenticationContext.Provider value={{ user, hydrated }}>
      {children}
    </AuthenticationContext.Provider>
  );
};

export default AuthenticationProvider;
