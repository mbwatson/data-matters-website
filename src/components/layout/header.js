import * as React from 'react'
import { Box, Link as Typography, Button } from '@mui/joy'
import { Link } from '../link'

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/courses', label: 'Course Catalog' },
  { to: '/instructors', label: 'Instructors' },
  { to: '/schedules', label: 'Schedules' },
]

const Header = ({ siteTitle }) => (
  <header
    style={{
      position: 'sticky',
      top: 0,
      backgroundColor: '#fff',
      borderBottom: '1px solid #333',
      zIndex: 1000,
    }}
  >
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        p: 2,
        maxWidth: '1200px',
        margin: '0 auto',
      }}
    >
      <Typography variant="h6">
        <Link to="/">{siteTitle}</Link>
      </Typography>

      <Box sx={{ display: 'flex', gap: 2 }}>
        {navLinks.map(({ to, label }) => (
          <Link key={label} to={to} underline="none">
            <Button variant="plain">{label}</Button>
          </Link>
        ))}
      </Box>
    </Box>
  </header>
)

export default Header
