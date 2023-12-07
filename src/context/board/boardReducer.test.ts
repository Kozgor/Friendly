import BoardReducer from './boardReducer';
import { IGlobalState } from '../../interfaces/globalState';

const enableAdding = jest.fn();
const disableAdding = jest.fn();
const finalizeTimer = jest.fn();
const setBoardId = jest.fn();
const setBoardTime = jest.fn();
const setTimerVisibility = jest.fn();
const setBoardStatus = jest.fn();
const setFormSubmit = jest.fn();
const downloadSummaryCSV = jest.fn();
const disableDownloadSummaryCSV = jest.fn();

describe('BoardReducer', () => {
  const initialState: IGlobalState = {
    boardId: 'Test ID',
    boardStatus: 'active',
    boardTime: 5,
    isAddingDisabled: false,
    isTimerFinalized: false,
    isTimerVisible: false,
    isFormSubmit: false,
    isSummaryDownload: false,
    enableAdding: enableAdding,
    disableAdding: disableAdding,
    finalizeTimer: finalizeTimer,
    setFormSubmit: setFormSubmit,
    downloadSummaryCSV: downloadSummaryCSV,
    disableDownloadSummaryCSV: disableDownloadSummaryCSV,
    setBoardId: setBoardId,
    setBoardTime: setBoardTime,
    setBoardStatus: setBoardStatus,
    setTimerVisibility: setTimerVisibility
  };

  it('should handle "ADDING_ENABLE" action', () => {
    const action = { type: 'ADDING_ENABLE' };
    const newState = BoardReducer(initialState, action);

    expect(newState.isAddingDisabled).toBe(false);
  });

  it('should handle "ADDING_DISABLE" action', () => {
    const action = { type: 'ADDING_DISABLE' };
    const newState = BoardReducer(initialState, action);

    expect(newState.isAddingDisabled).toBe(true);
  });

  it('should handle "SET_BOARD_TIME" action', () => {
    const action = { type: 'SET_BOARD_TIME', payload: 30 };
    const newState = BoardReducer(initialState, action);

    expect(newState.boardTime).toBe(30);
  });

  it('should handle "SET_BOARDID" action', () => {
    const action = { type: 'SET_BOARDID', payload: 'New test ID'};
    const newState = BoardReducer(initialState, action);

    expect(newState.boardId).toBe('New test ID');
  });

  it('should handle "SET_TIMER_VISIBILITY"', () => {
    const action = { type: 'SET_TIMER_VISIBILITY', payload: true };
    const newState = BoardReducer(initialState, action);

    expect(newState.isTimerVisible).toBeTruthy();
  });

  it('should handle "SET_BOARD_STATUS"', () => {
    const action = { type: 'SET_BOARD_STATUS', payload: 'finalized' };
    const newState = BoardReducer(initialState, action);

    expect(newState.boardStatus).toBe('finalized');
  });

  it('should handle "SUBMIT_FORM"', () => {
    const action = { type: 'SUBMIT_FORM' };
    const newState = BoardReducer(initialState, action);

    expect(newState.isFormSubmit).toBeTruthy();
  });

  it('should handle "DOWNLOAD_BOARD_SUMMARY_CSV"', () => {
    const action = { type: 'DOWNLOAD_BOARD_SUMMARY_CSV' };
    const newState = BoardReducer(initialState, action);

    expect(newState.isSummaryDownload).toBeTruthy();
  });

  it('should handle "DISABLE_DOWNLOAD_BOARD_SUMMARY_CSV"', () => {
    const action = { type: 'DISABLE_DOWNLOAD_BOARD_SUMMARY_CSV' };
    const newState = BoardReducer(initialState, action);

    expect(newState.isSummaryDownload).toBeFalsy();
  });

  it('should return the current state for an unknown action', () => {
    initialState.isAddingDisabled = true;

    const action = { type: 'UNKNOWN_ACTION' };
    const newState = BoardReducer(initialState, action);

    expect(newState).toEqual(initialState);
  });
});
