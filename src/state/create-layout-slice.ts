import { SetState } from "zustand";
import { State } from "@/state/store";
import produce from "immer";

export interface LayoutState {
  opened: boolean;
  toggleSidebar: () => void;
  close: () => void;
}

const createLayoutSlice = (set: SetState<State>): Pick<State, 'layout'> => ({
  layout: {
    opened: false,
    toggleSidebar: () => set(produce(draft => {
      draft.layout.opened = !draft.layout.opened;
    })),
    close: () => set(produce(draft => {
      draft.layout.opened = false;
    }))
  }
})

export default createLayoutSlice;
