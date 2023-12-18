import { createContext, useReducer } from 'react';
import { BaseProps } from '../../interfaces/baseProps';
import BoardReducer from './boardReducer';
import { IColumnCard } from '../../interfaces/columnCard';
import { IGlobalState } from '../../interfaces/globalState';

export const initialGlobalState: IGlobalState = {
  boardId: '',
  boardStatus: '',
  boardTime: 0,
  isFormSubmit: false,
  isTimerVisible: false,
  isTimerStarted: false,
  isTimerFinalized: false,
  isAddingDisabled: true,
  selectedCards: [],
  enableAdding: () => { },
  disableCommentCreation: () => { },
  startTimer: () => { },
  finalizeTimer: () => { },
  setFormSubmit: () => { },
  setBoardId: (id: string) => { },
  setBoardTime: (boardTime: number) => { },
  setTimerVisibility: (isTimerVisible: boolean) => { },
  setBoardStatus: (status: string) => { },
  selectCard: (card: IColumnCard) => { },
  unselectCard: (cardId: string) => { },
  resetSelectedCards: () => { }
};

export const BoardContext = createContext(initialGlobalState);

export const BoardProvider = ({ children }: BaseProps) => {
  const [state, dispatch] = useReducer(BoardReducer, initialGlobalState);

  const enableAdding = () => {
    dispatch({
      type: 'ADDING_ENABLE'
    });
  };

  const disableCommentCreation = () => {
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

  const selectCard = (card: IColumnCard) => {
    dispatch({
      type: 'SELECT_CARD',
      payload: card
    });
  };

  const unselectCard = (cardId: string) => {
    dispatch({
      type: 'UNSELECT_CARD',
      payload: cardId
    });
  };

  const resetSelectedCards = () => {
    dispatch({
      type: 'RESET_SELECTED_CARDS'
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
        selectedCards: state.selectedCards,
        enableAdding,
        disableCommentCreation,
        startTimer,
        finalizeTimer,
        setTimerVisibility,
        setBoardId,
        setBoardTime,
        setBoardStatus,
        setFormSubmit,
        selectCard,
        unselectCard,
        resetSelectedCards
      }}
    >
      {children}
    </BoardContext.Provider>
  );
};
