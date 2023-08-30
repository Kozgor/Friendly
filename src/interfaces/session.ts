import { IActionItem } from './actionItem';
import { IColumn } from './column';
import { ITheme } from './theme';
import { IUser } from './user';

export interface ISession {
  _id: string;
  sessionName: string;
  theme: ITheme;
  users: IUser[];
  columns: IColumn[];
  actionItems: IActionItem[];
}
