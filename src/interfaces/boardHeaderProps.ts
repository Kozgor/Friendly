import { MouseEventHandler } from 'react';

export interface IBoardHeaderProps {
  fullName: string;
  onSignOut: MouseEventHandler<HTMLButtonElement>;
}
