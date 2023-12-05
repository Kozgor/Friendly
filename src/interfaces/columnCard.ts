import { ICardReply } from './columnCardReply';

import { CardTag } from '../types/cardTags';

export interface ICardReactions {
  _id: string;
  userId: string;
  isHappyReaction: boolean;
}

export interface IColumnCard {
  _id: string;
  columnId?: string;
  createdAt: string;
  cardComment: string;
  cardAuthor: string;
  cardAuthorId: string;
  cardAuthorAvatar?: string;
  cardActionAuthorId?: string;
  cardTags?: CardTag[];
  cardReactions?: boolean|null;
  cardReplies?: ICardReply[];
  isEditable?: boolean;
  isDisabled?: boolean;
  onAction?: (actionType: string, newCard: IColumnCard) => void;
}
