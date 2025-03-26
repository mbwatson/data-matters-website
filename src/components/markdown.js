import * as React from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Link } from './link'
import { Typography } from '@mui/joy'

// this object defines a map: DOM elements --> React components,
// which allows us to streamline styles for incoming content.
const componentMap = {
  // for links, we'll use our smart link component.
  a: ({ href, ...props }) => <Link to={href} {...props} />,
  h1: ({ children, ...props }) => (
    <Typography variant="h1" {...props}>
      {children}
    </Typography>
  ),
  h2: ({ children, ...props }) => (
    <Typography variant="h2" {...props}>
      {children}
    </Typography>
  ),
  h3: ({ children, ...props }) => (
    <Typography variant="h3" {...props}>
      {children}
    </Typography>
  ),
  h4: ({ children, ...props }) => (
    <Typography variant="h4" {...props}>
      {children}
    </Typography>
  ),
  h5: ({ children, ...props }) => (
    <Typography variant="h5" {...props}>
      {children}
    </Typography>
  ),
  h6: ({ children, ...props }) => (
    <Typography variant="h6" {...props}>
      {children}
    </Typography>
  ),
  p: ({ children, ...props }) => (
    <Typography level="body-lg" {...props}>
      {children}
    </Typography>
  ),
}

export const Markdown = props => {
  return (
    <ReactMarkdown
      {...props}
      components={componentMap}
      remarkPlugins={[remarkGfm]}
    />
  )
}
