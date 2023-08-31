import { IColumnCard } from './columnCard';
import { IThemeColumn } from './themeColumn';

export interface IColumn extends IThemeColumn {
  cards: IColumnCard[];
}
