import { PanelContentPositions } from '../types/panelContentPositions';
import { ReactNode } from 'react';

export interface PropsChildren {
  element?: ReactNode | string;
  path?: ReactNode | string;
  label?: string;
  position?: PanelContentPositions;
  mode?: string;
}
