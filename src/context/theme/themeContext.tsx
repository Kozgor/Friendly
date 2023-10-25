import { createContext, useReducer } from 'react';
import { BaseProps } from '../../interfaces/baseProps';
import ThemeReducer from './themeReducer';
import { defaultTheme } from './themes';

export const initialThemeState = {
  theme: defaultTheme,
  setDefault: () => {}
};

export const ThemeContext = createContext(initialThemeState);

export const ThemeProvider = ({ children }: BaseProps) => {
  const [state, dispatch] = useReducer(ThemeReducer, initialThemeState);

  const setDefault = () => {
    dispatch({
      type: 'SET_DEFAULT_THEME'
    });
  };

  return (
    <ThemeContext.Provider
      value={{
        theme: state.theme,
        setDefault
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
