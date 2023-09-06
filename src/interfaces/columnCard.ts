import { ICardComments } from './columnCardComment';

export interface IColumnCard {
  cardId: string;
  cardMessage: string;
  cardAuthor: string;
  cardTags?: ('primary' | 'neutral' | 'danger' | 'success' | 'warning')[];
  cardReactions?: string[];
  cardComments?: ICardComments[];
  onSaveCard: (newCard: IColumnCard) => void;
  onRemoveCard: (cancelCard: string) => void
}
