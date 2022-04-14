import { SetState } from 'zustand';
import { State } from '@/state/store';
import produce from 'immer';

export type Role = 'ANON' | 'USER' | 'ADMIN';

export interface AuthState {
  role: 'ANON' | 'USER' | 'ADMIN';
  setRole: (role: Role) => void;
}

const createAuthSlice = (set: SetState<State>): Pick<State, 'auth'> => ({
  auth: {
    role: 'ANON',
    setRole: (role: Role) =>
      set(
        produce((draft) => {
          draft.auth.role = role;
        }),
      ),
  },
});

export default createAuthSlice;
