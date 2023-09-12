import { IAction } from '../interfaces/action';

const ColumnReducer = (state: any, action: IAction) => {
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
    default:
      return state;
  }
};

export default ColumnReducer;
