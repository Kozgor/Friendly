import { IActionItem } from "./actionItem";
import { IColumn } from "./column";
import { ITheme } from "./theme";
import { IUser } from "./user";

export interface ISession {
  _id: String;
  sessionName: String;
  theme: ITheme;
  users: IUser[];
  columns: IColumn[];
  actionItems: IActionItem[];
}
