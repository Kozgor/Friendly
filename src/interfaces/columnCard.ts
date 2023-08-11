import { ICardComments } from './cardComments';

export interface IColumnCard {
  cardId: string;
  cardMessage: string;
  cardAuthor: string;
  cardComments: ICardComments[];
}
