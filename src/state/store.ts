import createLayoutSlice, { LayoutState } from "@/state/create-layout-slice";
import create, { SetState } from "zustand";
import { devtools } from "zustand/middleware";

export interface State {
  layout: LayoutState;
}

export const initialState = (set: SetState<State>) => ({
  ...createLayoutSlice(set),
});

const useStore = create<State>(
  devtools(
    initialState,
    { name: 'store' },
  ),
)

export default useStore;
