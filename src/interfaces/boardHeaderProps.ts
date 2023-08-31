import { MouseEventHandler } from 'react';

export interface IBoardHeaderProps {
  fullName: string;
  boardName: string;
  isTimerVisible: boolean;
  time: number;
  onSignOut: MouseEventHandler<HTMLButtonElement>;
}
