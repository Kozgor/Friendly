import { IActionItem } from './actionItem';
import { IColumn } from './column';
import { ITheme } from './theme';
import { IUserProfile } from './user';

export interface ISession {
  _id: string;
  sessionName: string;
  theme: ITheme;
  users: IUserProfile[];
  columns: IColumn[];
  actionItems: IActionItem[];
}
