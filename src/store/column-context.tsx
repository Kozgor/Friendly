import { createContext, useReducer } from 'react';
import { BaseProps } from '../interfaces/baseProps';
import ColumnReducer from './column-reducer';

export const initialGlobalState = {
  boardId: '',
  isAddingDisabled: true,
  enableAdding: () => {},
  disableAdding: () => {},
  setBoardId: (id: string) => {}
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

  return (
    <ColumnContext.Provider
      value={{
        isAddingDisabled: state.isAddingDisabled,
        boardId: state.boardId,
        enableAdding,
        disableAdding,
        setBoardId
      }}
    >
      {children}
    </ColumnContext.Provider>
  );
};
