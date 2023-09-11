import { Action } from '@reduxjs/toolkit';

interface BoardState {
  isAddingDisabled: boolean;
}

const initialState: BoardState = {
  isAddingDisabled: false
};

const BoardReducer = (state: BoardState = initialState, action: Action) => {
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
    default:
      return state;
  }
};

export default BoardReducer;
