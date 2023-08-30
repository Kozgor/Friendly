import { IThemeCard } from './themeCard';
import { IThemeColumn } from './themeColumn';

export interface ICustomUserStyles {
  userId: string;
  card: IThemeCard;
  column: IThemeColumn;
}
