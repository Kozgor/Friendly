import { createContext, useReducer } from 'react';
import { BaseProps } from '../interfaces/baseProps';
import ColumnReducer from './column-reducer';

export const initialGlobalState = {
  isAddingDisabled: true,
  enableAdding: () => {},
  disableAdding: () => {}
};

export const ColumnContext = createContext(initialGlobalState);

export const ColumnProvider = ({ children }: BaseProps) => {
  const [state, dispatch] = useReducer(ColumnReducer, initialGlobalState);

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

  return (
    <ColumnContext.Provider
      value={{
        isAddingDisabled: state.isAddingDisabled,
        enableAdding,
        disableAdding
      }}
    >
      {children}
    </ColumnContext.Provider>
  );
};
