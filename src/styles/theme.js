import { extendTheme } from '@mui/joy/styles'
import '@fontsource/lato'
import '@fontsource/josefin-sans'

export const theme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: {
          50: '#e3f2fd',
          100: '#bbdefb',
          200: '#90caf9',
          300: '#64b5f6',
          400: '#42a5f5',
          500: '#0a374b', // Main primary color
          600: '#0288d1',
          700: '#0277bd',
          800: '#0266a2',
          900: '#01579b',
          mainChannel: '10 55 75', // RGB values for 0a374b
          contrastText: '#FFFFFF',
        },
        secondary: {
          50: '#fce4ec',
          100: '#f8bbd0',
          200: '#f48fb1',
          300: '#f06292',
          400: '#ec407a',
          500: '#d17d38', // tertiary color from your theme
          600: '#d81b60',
          700: '#c2185b',
          800: '#ad1457',
          900: '#880e4f',
          mainChannel: '209 125 56', // RGB values for d17d38
          contrastText: '#FFFFFF',
        },
        background: {
          body: '#0a374b', // Dark blue background
          surface: '#0a374b', // Card backgrounds
          level1: '#114a63', // Slightly lighter for hover states
          level2: '#155978', // Even lighter for active states
          level3: '#1a678c', // For highlighted elements
          popup: '#0a374b', // For modals, drawers
        },
        text: {
          primary: '#FFFFFF',
          secondary: '#b3e5fc', // Light blue text
          tertiary: '#d17d38', // Accent color
        },
        divider: 'rgba(255, 255, 255, 0.12)',
      },
    },
    // For dark mode later
    dark: {
      palette: {
        // Copy from the light theme but you could customize it further
        primary: {
          50: '#e3f2fd',
          100: '#bbdefb',
          200: '#90caf9',
          300: '#64b5f6',
          400: '#42a5f5',
          500: '#0a374b', // Main primary color
          600: '#0288d1',
          700: '#0277bd',
          800: '#0266a2',
          900: '#01579b',
          mainChannel: '10 55 75',
          contrastText: '#FFFFFF',
        },
        secondary: {
          50: '#fce4ec',
          100: '#f8bbd0',
          200: '#f48fb1',
          300: '#f06292',
          400: '#ec407a',
          500: '#d17d38', // tertiary color from your theme
          600: '#d81b60',
          700: '#c2185b',
          800: '#ad1457',
          900: '#880e4f',
          mainChannel: '209 125 56',
          contrastText: '#FFFFFF',
        },
        background: {
          body: '#0a374b',
          surface: '#0a374b',
          level1: '#114a63',
          level2: '#155978',
          level3: '#1a678c',
          popup: '#0a374b',
        },
        text: {
          primary: '#FFFFFF',
          secondary: '#b3e5fc',
          tertiary: '#d17d38',
        },
        divider: 'rgba(255, 255, 255, 0.12)',
      },
    },
  },
  typography: {
    fontFamily: 'Josefin Sans, sans-serif',
    h1: { fontFamily: 'Lato, sans-serif', color: '#FFFFFF' },
    h2: { fontFamily: 'Lato, sans-serif', color: '#FFFFFF' },
    h3: { fontFamily: 'Lato, sans-serif', color: '#FFFFFF' },
    h4: { fontFamily: 'Lato, sans-serif', color: '#FFFFFF' },
    h5: { fontFamily: 'Lato, sans-serif', color: '#FFFFFF' },
    h6: { fontFamily: 'Lato, sans-serif', color: '#FFFFFF' },
    'title-lg': { color: '#FFFFFF' },
    'title-md': { color: '#FFFFFF' },
    'title-sm': { color: '#FFFFFF' },
    'body-lg': { color: '#FFFFFF' },
    'body-md': { color: '#FFFFFF' },
    'body-sm': { color: '#FFFFFF' },
  },
  radius: {
    xs: 2,
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
  },
  shadow: {
    xs: '0 1px 2px rgba(0,0,0,0.5)',
    sm: '0 2px 4px rgba(0,0,0,0.5)',
    md: '0 4px 8px rgba(0,0,0,0.5)',
    lg: '0 8px 16px rgba(0,0,0,0.5)',
    xl: '0 12px 24px rgba(0,0,0,0.5)',
  },
  components: {
    JoyCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#0a374b',
          color: '#FFFFFF',
        },
      },
    },
    JoyInput: {
      styleOverrides: {
        root: {
          backgroundColor: '#114a63',
        },
      },
    },
    JoyButton: {
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundColor: '#155978',
          },
        },
      },
    },
    JoyModal: {
      styleOverrides: {
        backdrop: {
          backdropFilter: 'blur(4px)',
          backgroundColor: 'rgba(10, 55, 75, 0.7)',
        },
      },
    },
  },
  cssVarPrefix: 'joy',
})

export default theme
