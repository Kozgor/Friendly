export interface IGlobalState {
  boardId: string;
  isAddingDisabled: boolean;
  enableAdding: () => void;
  disableAdding: () => void;
  setBoardId: (id: string) => void;
}
