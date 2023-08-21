import { Action } from '@reduxjs/toolkit';

const ColumnReducer = (state: any, action: Action) => {
  switch (action.type) {
    case 'ADDING_ENABLE':
      return {
        isAddingDisabled: false
      };
    case 'ADDING_DISABLE':
      return {
        isAddingDisabled: true
      };
    default:
      return state;
  }
};

export default ColumnReducer;
