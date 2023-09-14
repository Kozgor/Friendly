import { IAction } from '../interfaces/action';
import { IGlobalState } from '../interfaces/globalState';

const ColumnReducer = (state: IGlobalState, action: IAction) => {
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
    case 'SET_BOARDID':
      return {
        ...state,
        boardId: action.payload
      };
    case 'AUTOSAVE_CARD':
      return {
        ...state,
        isAddingDisabled: false,
        tempCard: action.payload
      };
    default:
      return state;
  }
};

export default ColumnReducer;
