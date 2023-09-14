import { createContext, useReducer } from 'react';
import { BaseProps } from '../interfaces/baseProps';
import ColumnReducer from './column-reducer';
import { IColumnCard } from '../interfaces/columnCard';

export const initialGlobalState = {
  boardId: '',
  isAddingDisabled: true,
  tempCard: {},
  enableAdding: () => {},
  disableAdding: () => {},
  setBoardId: (id: string) => {},
  autoSaveCard: (card: IColumnCard) => {}
};

export const ColumnContext = createContext(initialGlobalState);

export const ColumnProvider = ({ children }: BaseProps) => {
  const [state, dispatch] = useReducer(ColumnReducer, initialGlobalState);

  const enableAdding = () => {
    dispatch({
      type: 'ADDING_ENABLE'
    });
  };

  const disableAdding = () => {
    dispatch({
      type: 'ADDING_DISABLE'
    });
  };

  const setBoardId = (id: string) => {
    dispatch({
      type: 'SET_BOARDID',
      payload: id
    });
  };

  const autoSaveCard = (card: IColumnCard) => {
    dispatch({
      type: 'AUTOSAVE_CARD',
      payload: card
    });
  };

  return (
    <ColumnContext.Provider
      value={{
        isAddingDisabled: state.isAddingDisabled,
        boardId: state.boardId,
        tempCard: state.tempCard,
        enableAdding,
        disableAdding,
        setBoardId,
        autoSaveCard
      }}
    >
      {children}
    </ColumnContext.Provider>
  );
};
