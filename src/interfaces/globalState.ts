export interface IGlobalState {
  boardId: string;
  boardStatus: string;
  boardTime: number;
  isAddingDisabled: boolean;
  isTimerFinalized: boolean;
  isTimerVisible: boolean;
  isFormSubmit: boolean;
  isSummaryDownload: boolean;
  enableAdding: () => void;
  disableAdding: () => void;
  finalizeTimer: () => void;
  setFormSubmit: () => void;
  downloadSummaryCSV: () => void;
  disableDownloadSummaryCSV: () => void;
  setBoardId: (id: string) => void;
  setBoardStatus: (status: string) => void;
  setBoardTime: (boardTime: number) => void;
  setTimerVisibility: (timerVisibility: boolean) => void;
}
