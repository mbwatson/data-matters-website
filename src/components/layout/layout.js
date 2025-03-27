import React, { Fragment } from 'react'
import { useStaticQuery, graphql } from 'gatsby'

import Header from './header'
import { Container } from './container'

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
    <Fragment>
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
        }}
      >
        <Header siteTitle={data.site.siteMetadata?.title || `Title`} />
        <Container>
          <main style={{ flex: 1 }}>{children}</main>
        </Container>
        <footer>© {new Date().getFullYear()}</footer>
      </div>
    </Fragment>
  )
}
