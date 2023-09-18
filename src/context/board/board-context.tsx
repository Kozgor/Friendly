import { createContext, useReducer } from 'react';
import { BaseProps } from '../../interfaces/baseProps';
import BoardReducer from './board-reducer';

export const initialGlobalState = {
  boardId: '',
  isAddingDisabled: true,
  enableAdding: () => {},
  disableAdding: () => {},
  setBoardId: (id: string) => {}
};

export const BoardContext = createContext(initialGlobalState);

export const BoardProvider = ({ children }: BaseProps) => {
  const [state, dispatch] = useReducer(BoardReducer, initialGlobalState);

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
    <BoardContext.Provider
      value={{
        isAddingDisabled: state.isAddingDisabled,
        boardId: state.boardId,
        enableAdding,
        disableAdding,
        setBoardId
      }}
    >
      {children}
    </BoardContext.Provider>
  );
};
