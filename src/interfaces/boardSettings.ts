import { IColumn } from './column';

export interface IBoardSettings {
  _id?: string;
  name: string;
  theme: string;
  timer: number;
  participants: string[];
  columns: IColumn[];
  status: string;
}
