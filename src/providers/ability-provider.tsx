import { AbilityContext } from '@/contexts/casl-context';
import {
  PropsWithChildren,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Ability } from '@casl/ability';
import { AuthenticationContext } from '@/providers/authentication-provider';
import { useIsMounted } from 'react-query/types/devtools/utils';
import { useLogger } from '@mantine/hooks';
import useStore from '@/state/store';

const generate =
  (subject: string) =>
  (...actions: string[]) =>
    actions.map((a) => ({
      subject: subject,
      action: a,
    }));

const permissions: Record<string, { subject: string; action: string }[]> = {
  ADMIN: [
    ...generate('user')('view', 'delete', 'invite'),
    ...generate('card')('view', 'delete', 'update', 'create'),
  ],
  USER: [...generate('card')('view', 'delete', 'update', 'create')],
  ANON: [...generate('card')('view', 'delete', 'update', 'create')],
};

const AbilityProvider = ({ children }: PropsWithChildren<any>) => {
  const [ability, setAbility] = useState(new Ability());
  const mountRef = useRef<boolean>(false);
  const { role } = useStore((s) => s.auth);
  const { user } = useContext(AuthenticationContext);

  useLogger('ability-provider', [role]);

  useEffect(() => {
    mountRef.current = true;
    return () => {
      mountRef.current = false;
    };
  }, []);

  useEffect(() => {
    setAbility(new Ability(role === 'ANON' ? [] : permissions[role]));
  }, [role]);

  return (
    <AbilityContext.Provider value={ability}>
      {children}
    </AbilityContext.Provider>
  );
};

export default AbilityProvider;
