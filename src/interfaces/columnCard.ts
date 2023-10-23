import { ICardReply } from './columnCardReply';

import { CardTag } from '../types/cardTags';

export interface IColumnCard {
  _id: string;
  createdAt: string;
  cardComment: string;
  cardAuthor: string;
  cardAuthorId: string;
  cardAuthorAvatar?: string;
  cardTags?: CardTag[];
  cardReactions?: string[];
  cardReplies?: ICardReply[];
  isEditable?: boolean;
  isDisabled?: boolean;
  onAction?: (actionType: string, newCard: IColumnCard) => void;
}
