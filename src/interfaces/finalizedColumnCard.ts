import { IColumnCard } from './columnCard';

export interface IFinalizedColumnCard extends IColumnCard {
    onEditCard: (cardId: string) => void;
}
