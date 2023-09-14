import { IColumnCard } from './columnCard';

export interface IGlobalState {
  boardId: string;
  isAddingDisabled: boolean;
  tempCard: IColumnCard;
  enableAdding: () => void;
  disableAdding: () => void;
  setBoardId: (id: string) => void;
  autoSaveCard: (card: IColumnCard) => void;
}
