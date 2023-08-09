import { ICardComments } from './cardComments';

export interface IColumnCard {
  cardId: String;
  cardMessage: String;
  cardAuthor: String;
  cardComments: ICardComments[];
}
