import BoardReducer from './boardReducer';
import { IGlobalState } from '../../interfaces/globalState';

const enableAdding = jest.fn();
const disableAdding = jest.fn();
const finalizeTimer = jest.fn();
const setBoardId = jest.fn();
const setBoardStatus = jest.fn();
const setFormSubmit = jest.fn();

describe('BoardReducer', () => {
  const initialState: IGlobalState = {
      boardId: 'Test ID',
      boardStatus: 'Test ID',
      isAddingDisabled: false,
      isTimerFinalized: false,
      isFormSubmit: false,
      enableAdding: enableAdding,
      disableAdding: disableAdding,
      finalizeTimer: finalizeTimer,
      setFormSubmit: setFormSubmit,
      setBoardId: setBoardId,
      setBoardStatus : setBoardStatus
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

  it('should handle "SET_BOARDID" action', () => {
    const action = { type: 'SET_BOARDID', payload: 'New test ID'};
    const newState = BoardReducer(initialState, action);

    expect(newState.boardId).toBe('New test ID');
  });

  it('should return the current state for an unknown action', () => {
    initialState.isAddingDisabled = true;

    const action = { type: 'UNKNOWN_ACTION' };
    const newState = BoardReducer(initialState, action);

    expect(newState).toEqual(initialState);
  });
});
