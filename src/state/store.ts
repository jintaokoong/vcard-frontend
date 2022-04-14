import createLayoutSlice, { LayoutState } from '@/state/create-layout-slice';
import create, { SetState } from 'zustand';
import { devtools } from 'zustand/middleware';
import createAuthSlice, { AuthState } from '@/state/create-auth-slice';

export interface State {
  layout: LayoutState;
  auth: AuthState;
}

export const initialState = (set: SetState<State>) => ({
  ...createLayoutSlice(set),
  ...createAuthSlice(set),
});

const useStore = create<State>(devtools(initialState, { name: 'store' }));

export default useStore;
