export interface IGlobalState {
  boardId: string;
  boardStatus: string;
  isAddingDisabled: boolean;
  isTimerFinalized: boolean;
  isFormSubmit: boolean;
  enableAdding: () => void;
  disableAdding: () => void;
  finalizeTimer: () => void;
  setFormSubmit: () => void;
  setBoardId: (id: string) => void;
  setBoardStatus: (status: string) => void;
}
