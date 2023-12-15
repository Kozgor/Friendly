import { createContext, useReducer } from 'react';
import { BaseProps } from '../../interfaces/baseProps';
import BoardReducer from './boardReducer';

export const initialGlobalState = {
  boardId: '',
  boardStatus: '',
  boardTime: 0,
  isFormSubmit: false,
  isTimerVisible: false,
  isTimerStarted: false,
  isTimerFinalized: false,
  isAddingDisabled: true,
  enableAdding: () => { },
  disableAdding: () => { },
  startTimer: () => { },
  finalizeTimer: () => { },
  setFormSubmit: () => { },
  setBoardId: (id: string) => { },
  setBoardTime: (boardTime: number) => { },
  setTimerVisibility: (isTimerVisible: boolean) => { },
  setBoardStatus: (status: string) => { }
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

  const setBoardTime = (boardTime: number) => {
    dispatch({
      type: 'SET_BOARD_TIME',
      payload: boardTime
    });
  };

  const setTimerVisibility = (timerVisibility: boolean) => {
    dispatch({
      type: 'SET_TIMER_VISIBILITY',
      payload: timerVisibility
    });
  };

  const setFormSubmit = () => {
    dispatch({
      type: 'SUBMIT_FORM'
    });
  };

  const startTimer = () => {
    dispatch({
      type: 'START_TIMER'
    });
  };

  return (
    <BoardContext.Provider
      value={{
        isAddingDisabled: state.isAddingDisabled,
        isTimerStarted: state.isTimerStarted,
        isTimerFinalized: state.isTimerFinalized,
        isTimerVisible: state.isTimerVisible,
        isFormSubmit: state.isFormSubmit,
        boardId: state.boardId,
        boardStatus: state.boardStatus,
        boardTime: state.boardTime,
        enableAdding,
        disableAdding,
        startTimer,
        finalizeTimer,
        setTimerVisibility,
        setBoardId,
        setBoardTime,
        setBoardStatus,
        setFormSubmit
      }}
    >
      {children}
    </BoardContext.Provider>
  );
};
