import * as React from 'react'
import { Box } from '@mui/joy'

export const Container = ({ children }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexGrow: 1,
        maxWidth: '1200px',
        width: '100%',
        margin: '0 auto',
        justifyContent: 'center',
        border: '1px dashed grey',
      }}
    >
      {children}
    </Box>
  )
}
