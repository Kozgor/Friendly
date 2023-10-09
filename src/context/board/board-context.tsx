import { createContext, useReducer } from 'react';
import { BaseProps } from '../../interfaces/baseProps';
import BoardReducer from './board-reducer';

export const initialGlobalState = {
  boardId: '',
  boardStatus: '',
  isFormSubmit: false,
  isTimerFinalized: false,
  isAddingDisabled: true,
  enableAdding: () => {},
  disableAdding: () => {},
  finalizeTimer: () => {},
  setFormSubmit: () => {},
  setBoardId: (id: string) => {},
  setBoardStatus: (status: string) => {}
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

  const finalizeTimer = () => {
    dispatch({
      type: 'FINALIZE_TIMER'
    });
  };

  const setBoardId = (id: string) => {
    dispatch({
      type: 'SET_BOARDID',
      payload: id
    });
  };
  const setBoardStatus = (boardStatus: string) => {
    dispatch({
      type: 'SET_BOARD_STATUS',
      payload: boardStatus
    });
  };
  const setFormSubmit = () => {
    dispatch({
      type: 'SUBMIT_FORM'
    });
  };

  return (
    <BoardContext.Provider
      value={{
        isAddingDisabled: state.isAddingDisabled,
        isTimerFinalized: state.isTimerFinalized,
        isFormSubmit: state.isFormSubmit,
        boardId: state.boardId,
        boardStatus: state.boardStatus,
        enableAdding,
        disableAdding,
        finalizeTimer,
        setBoardId,
        setBoardStatus,
        setFormSubmit
      }}
    >
      {children}
    </BoardContext.Provider>
  );
};
