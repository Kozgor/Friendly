import { Action } from '@reduxjs/toolkit';

interface ColumnState {
  isAddingDisabled: boolean;
}

const initialState: ColumnState = {
  isAddingDisabled: false
};

const ColumnReducer = (state: ColumnState = initialState, action: Action) => {
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

export default ColumnReducer;
