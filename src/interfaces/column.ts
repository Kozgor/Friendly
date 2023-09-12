import { IColumnCard } from './columnCard';

export interface IColumn {
  columnId: string;
  columnTitle: string;
  columnSubtitle: string;
  columnAvatar: string;
  columnStyle: string;
  // columnCards: IColumnCard[];
}
