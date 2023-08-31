import { IColumn } from './column';

export interface IBoardSettings {
  name: string;
  theme: string;
  timer: number;
  columns: IColumn[];
  status: string;
}
