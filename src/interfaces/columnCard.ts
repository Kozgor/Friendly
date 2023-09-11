import { ICardComments } from './columnCardComment';

import { CardTag } from '../types/cardTags';

export interface IColumnCard {
  cardId: string;
  cardMessage: string;
  cardAuthor: string;
  cardTags?: CardTag[]
  cardReactions?: string[];
  cardComments?: ICardComments[];
  saveCard: (newCard: IColumnCard) => void;
  removeCard: (cardId: string) => void
}
