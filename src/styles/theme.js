import { extendTheme } from '@mui/joy/styles'
import '@fontsource/lato'
import '@fontsource/josefin-sans'

export const theme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: '#0a374b',
          contrastText: '#FFFFFF',
        },
        secondary: {
          main: '#DC143C',
          contrastText: '#FFFFFF',
        },
        tertiary: {
          main: '#d17d38',
          contrastText: '#FFFFFF',
        },
        background: {
          body: '#0a374b',
          surface: '#0a374b',
          level1: '#0a374b',
          level2: '#0a374b',
        },
        text: {
          primary: '#FFFFFF',
          secondary: '#DC143C',
          tertiary: '#d17d38',
        },
      },
    },
  },
  typography: {
    fontFamily: 'Josefin Sans, sans-serif',
    h1: { fontFamily: 'Lato, sans-serif' },
    h2: { fontFamily: 'Lato, sans-serif' },
    h3: { fontFamily: 'Lato, sans-serif' },
    h4: { fontFamily: 'Lato, sans-serif' },
    h5: { fontFamily: 'Lato, sans-serif' },
    h6: { fontFamily: 'Lato, sans-serif' },
  },
  radius: {
    xs: 0,
    sm: 0,
    md: 0,
    lg: 0,
    xl: 0,
  },
  cssVarPrefix: 'joy',
})

export default theme
