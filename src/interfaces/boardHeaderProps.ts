import { MouseEventHandler } from 'react';

export interface IBoardHeaderProps {
  fullName: string;
  isTimerVisible: boolean | null;
  onSignOut: MouseEventHandler<HTMLButtonElement>;
}
