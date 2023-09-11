import { ICardReply } from './columnCardReply';

export interface IColumnCard {
  cardId: string;
  cardComment: string;
  cardAuthor: string;
  cardTags?: ('primary' | 'neutral' | 'danger' | 'success' | 'warning')[];
  cardReactions?: string[];
  cardReplies?: ICardReply[];
  isEditable?: boolean;
  onAction: (actionType: string, newCard: IColumnCard) => void;
}
