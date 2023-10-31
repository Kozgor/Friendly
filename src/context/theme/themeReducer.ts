import { IAction } from '../../interfaces/action';
import { IThemeState } from '../../interfaces/themeState';
import { defaultTheme } from '../../theme/default';

const ThemeReducer = (state: IThemeState, action: IAction) => {
  switch (action.type) {
    case 'SET_DEFAULT_THEME':
      return {
        ...state,
        theme: defaultTheme
      };
    default:
      return state;
  }
};

export default ThemeReducer;
