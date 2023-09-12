import { ICardReply } from './columnCardReply';

import { CardTag } from '../types/cardTags';

export interface IColumnCard {
  _id: string;
  cardComment: string;
  cardAuthor: string;
  cardTags?: CardTag[];
  cardReactions?: string[];
  cardReplies?: ICardReply[];
  isEditable?: boolean;
  onAction?: (actionType: string, newCard: IColumnCard) => void;
}
