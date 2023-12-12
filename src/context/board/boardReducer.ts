/* eslint-disable complexity */
import { IAction } from '../../interfaces/action';
import { IGlobalState } from '../../interfaces/globalState';

const BoardReducer = (state: IGlobalState, action: IAction) => {
  switch (action.type) {
    case 'ADDING_ENABLE':
      return {
        ...state,
        isAddingDisabled: false
      };
    case 'ADDING_DISABLE':
      return {
        ...state,
        isAddingDisabled: true
      };
    case 'FINALIZE_TIMER':
      return {
        ...state,
        isTimerFinalized: true
      };
    case 'SET_BOARDID':
      return {
        ...state,
        boardId: action.payload
      };
    case 'SET_BOARD_TIME':
      return {
        ...state,
        boardTime: action.payload
      };
    case 'SET_TIMER_VISIBILITY':
      return {
        ...state,
        isTimerVisible: action.payload
      };
    case 'SET_BOARD_STATUS':
      return {
        ...state,
        boardStatus: action.payload
      };
    case 'SUBMIT_FORM':
      return {
        ...state,
        isFormSubmit: true
      };
    default:
      return state;
  }
};

export default BoardReducer;
