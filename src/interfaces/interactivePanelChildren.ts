import { PanelContentPositions } from '../types/panelContentPositions';
import { ReactNode } from 'react';

export interface PropsChildren {
  element?: ReactNode|string,
  label?: string;
  position: PanelContentPositions,
}
