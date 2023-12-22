import { PanelContentPositions } from '../types/panelContentPositions';
import { ReactNode } from 'react';

type Mode = 'activeBoard' | 'finalizedBoard';

export interface PropsChildren {
  element?: ReactNode | string | null;
  path?: ReactNode | string | null;
  label?: string | null;
  position?: PanelContentPositions | null;
  mode?: Mode | null;
}
