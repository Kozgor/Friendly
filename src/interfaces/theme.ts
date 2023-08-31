import { IThemeObject } from './themeObject';

export interface ITheme {
  name: string;
  header: IThemeObject;
  board: IThemeObject;
  comment: IThemeObject;
  button: IThemeObject;
}
