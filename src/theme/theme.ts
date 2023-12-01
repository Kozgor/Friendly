import { extendTheme } from '@mui/joy';

// You can put this to any file that's included in your tsconfig
import type { PaletteRange } from '@mui/joy/styles';
import { PaletteColorOptions } from '@mui/material';
import { createTheme } from '@mui/system';

declare module '@mui/joy/styles' {
  interface ColorPalettePropOverrides {
    // apply to all Joy UI components that support `color` prop
    secondary: true;
    accent: true;
    shades: true;
  }

  interface Palette {
    // this will make nodes configurable in `extendTheme`
    // and add nodes to the theme's palette.
    secondary: PaletteRange;
    accent: PaletteRange;
    shades: PaletteRange;
  }
}
declare module '@mui/material/styles' {
  interface PaletteOptions {
    neutral: PaletteColorOptions;
    accent: PaletteColorOptions;
    shades: PaletteColorOptions;
  }
}

const joyTheme = extendTheme({
  cssVarPrefix: 'friendly',
  colorSchemes: {
    light: {
      palette: {
        neutral: {
          50: '#F4F4F4',
          100: '#DDDDDE',
          200: '#BABBBD',
          300: '#A3A5A7',
          400: '#8C8E91',
          500: '#75777B',
          600: '#5E6165',
          700: '#474A4F',
          800: '#303439',
          900: '#191D23'
        },
        primary: {
          50: '#F3F8F8',
          100: '#DCE9EB',
          200: '#B9D2D7',
          300: '#A2C3CA',
          400: '#8AB4BC',
          500: '#73A5AF',
          600: '#5C96A2',
          700: '#458795',
          800: '#2D7887',
          900: '#16697A'
        },
        secondary: {
          50: '#FFF7F2',
          100: '#FFE7D9',
          200: '#FFCFB3',
          300: '#FFBF99',
          400: '#FFAF80',
          500: '#FFA066',
          600: '#FF904D',
          700: '#FF8033',
          800: '#FF701A',
          900: '#FF6000'
        },
        accent: {
          50: '#FFFBF4',
          100: '#FFF2DF',
          200: '#FFF4BF',
          300: '#FFDBAA',
          400: '#FFD295',
          500: '#FFCA80',
          600: '#FFC16B',
          700: '#FFB855',
          800: '#FFAF40',
          900: '#FFA62B'
        },
        shades: {
          50: '#FFFFFF',
          900: '#000000'
        }
      }
    }
  }
});

const materialTheme = createTheme({
  shadows: [
    'none',
    '0px 2px 1px -1px rgba(0,0,0,0.12),0px 1px 1px 0px rgba(0,0,0,0.24),0px 1px 3px 0px rgba(0,0,0,0.12)',
    '0px 3px 1px -2px rgba(0,0,0,0.12),0px 2px 2px 0px rgba(0,0,0,0.24),0px 1px 5px 0px rgba(0,0,0,0.12)'
  ],
  palette: {
    neutral: {
      50: '#F4F4F4',
      100: '#DDDDDE',
      200: '#BABBBD',
      300: '#A3A5A7',
      400: '#8C8E91',
      500: '#75777B',
      600: '#5E6165',
      700: '#474A4F',
      800: '#303439',
      900: '#191D23',
      main: '#8C8E91'
    },
    primary: {
      50: '#F3F8F8',
      100: '#DCE9EB',
      200: '#B9D2D7',
      300: '#A2C3CA',
      400: '#8AB4BC',
      500: '#73A5AF',
      600: '#5C96A2',
      700: '#458795',
      800: '#2D7887',
      900: '#16697A',
      main: '#8AB4BC'
    },
    secondary: {
      50: '#FFF7F2',
      100: '#FFE7D9',
      200: '#FFCFB3',
      300: '#FFBF99',
      400: '#FFAF80',
      500: '#FFA066',
      600: '#FF904D',
      700: '#FF8033',
      800: '#FF701A',
      900: '#FF6000',
      main: '#FFAF80'
    },
    accent: {
      50: '#FFFBF4',
      100: '#FFF2DF',
      200: '#FFF4BF',
      300: '#FFDBAA',
      400: '#FFD295',
      500: '#FFCA80',
      600: '#FFC16B',
      700: '#FFB855',
      800: '#FFAF40',
      900: '#FFA62B',
      main: '#FFD295'
    },
    shades: {
      50: '#FFFFFF',
      900: '#000000',
      main: '#FFFFFF'
    }
  },
  transitions: {
    create: (prop: any) => `transition(${prop}, duration.enteringScreen)`,
    duration: {
      enteringScreen: 0,
      leavingScreen: 0
    }
  }
});

export { joyTheme, materialTheme };
