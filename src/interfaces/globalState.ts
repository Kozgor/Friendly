export interface IGlobalState {
  boardId: string;
  boardStatus: string;
  isAddingDisabled: boolean;
  isFormSubmit: boolean;
  enableAdding: () => void;
  disableAdding: () => void;
  setFormSubmit: () => void;
  setBoardId: (id: string) => void;
  setBoardStatus: (status: string) => void;
}
