import { createContext, useReducer } from 'react';
import { BaseProps } from '../../interfaces/baseProps';
import ColumnReducer from './board-reducer';

export const initialGlobalState = {
  isAddingDisabled: true,
  enableAdding: () => {},
  disableAdding: () => {}
};

export const BoardContext = createContext(initialGlobalState);

export const BoardProvider = ({ children }: BaseProps) => {
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
    <BoardContext.Provider
      value={{
        isAddingDisabled: state.isAddingDisabled,
        enableAdding,
        disableAdding
      }}
    >
      {children}
    </BoardContext.Provider>
  );
};
