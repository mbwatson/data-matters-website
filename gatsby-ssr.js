const React = require('react')
const theme = require('./src/styles/theme')
const { CssVarsProvider } = require('@mui/joy/styles')
const { Layout } = require('./src/components/layout')

exports.wrapPageElement = ({ element, props }) => {
  return (
    <CssVarsProvider theme={theme}>
      <Layout {...props}>{element}</Layout>
    </CssVarsProvider>
  )
}
