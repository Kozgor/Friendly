import { IColumnCard } from './columnCard';

export interface IGlobalState {
  boardId: string;
  boardStatus: string;
  boardTime: number;
  isAddingDisabled: boolean;
  isTimerStarted: boolean;
  isTimerFinalized: boolean;
  isTimerVisible: boolean;
  isFormSubmit: boolean;
  selectedCards: IColumnCard[];
  enableAdding: () => void;
  disableAdding: () => void;
  startTimer: () => void;
  finalizeTimer: () => void;
  setFormSubmit: () => void;
  setBoardId: (id: string) => void;
  setBoardStatus: (status: string) => void;
  setBoardTime: (boardTime: number) => void;
  setTimerVisibility: (timerVisibility: boolean) => void;
  selectCard: (card: IColumnCard) => void;
  unselectCard: (cardId: string) => void;
  resetSelectedCards: () => void;
}
