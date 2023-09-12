import { ICardReply } from './columnCardReply';

import { CardTag } from '../types/cardTags';

export interface IColumnCard {
  cardId: string;
  cardComment: string;
  cardAuthor: string;
  cardTags?: CardTag[]
  cardReactions?: string[];
  cardReplies?: ICardReply[];
  isEditable?: boolean;
  onAction: (actionType: string, newCard: IColumnCard) => void;
}
