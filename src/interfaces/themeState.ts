interface IColorTheme {
  color1: string,
  color2: string,
  color3: string,
  color4: string,
  color5: string,
  color6: string,
  color7: string
}

export interface IThemeState {
  theme: IColorTheme;
  setDefault: () => void;
}
