import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import Header from './header'
import { Box } from '@mui/joy'

export const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        bgcolor: 'background.body',
        color: 'text.primary',
      }}
    >
      {/* Main content area */}
      <Header siteTitle={data.site.siteMetadata?.title || `Title`} />
      <Box
        component="main"
        sx={{
          flex: 1,
          width: '100%',
          position: 'relative',
        }}
      >
        {children}
      </Box>
    </Box>
  )
}
