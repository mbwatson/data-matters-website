import * as React from 'react'
import { Box } from '@mui/joy'

export const Container = ({ children }) => {
  return (
    <Box
      sx={{
        p: 2,
        maxWidth: '1200px',
        width: '100%',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: '1px dashed grey',
      }}
    >
      {children}
    </Box>
  )
}
