import { createContext, useReducer } from 'react';
import { BaseProps } from '../../interfaces/baseProps';
import BoardReducer from './boardReducer';

export const initialGlobalState = {
  boardId: '',
  boardStatus: '',
  boardTime: 0,
  isFormSubmit: false,
  isSummaryDownload: false,
  isTimerVisible: false,
  isTimerFinalized: false,
  isAddingDisabled: true,
  enableAdding: () => {},
  disableAdding: () => {},
  finalizeTimer: () => {},
  setFormSubmit: () => {},
  downloadSummaryCSV: () => {},
  disableDownloadSummaryCSV: () => {},
  setBoardId: (id: string) => {},
  setBoardTime: (boardTime: number) => {},
  setTimerVisibility: (isTimerVisible: boolean) => {},
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

  const downloadSummaryCSV = () => {
    dispatch({
      type: 'DOWNLOAD_BOARD_SUMMARY_CSV'
    });
  };

  const disableDownloadSummaryCSV = () => {
    dispatch({
      type: 'DISABLE_DOWNLOAD_BOARD_SUMMARY_CSV'
    });
  };

  return (
    <BoardContext.Provider
      value={{
        isAddingDisabled: state.isAddingDisabled,
        isTimerFinalized: state.isTimerFinalized,
        isTimerVisible: state.isTimerVisible,
        isFormSubmit: state.isFormSubmit,
        isSummaryDownload: state.isSummaryDownload,
        boardId: state.boardId,
        boardStatus: state.boardStatus,
        boardTime: state.boardTime,
        enableAdding,
        disableAdding,
        finalizeTimer,
        setTimerVisibility,
        setBoardId,
        setBoardTime,
        setBoardStatus,
        setFormSubmit,
        downloadSummaryCSV,
        disableDownloadSummaryCSV
      }}
    >
      {children}
    </BoardContext.Provider>
  );
};
