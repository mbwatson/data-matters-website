import React, { useState } from 'react'
import AspectRatio from '@mui/joy/AspectRatio'
import Card from '@mui/joy/Card'
import CardContent from '@mui/joy/CardContent'
import IconButton from '@mui/joy/IconButton'
import Typography from '@mui/joy/Typography'
import {
  ExpandMore,
  ExpandLess,
  BookmarkBorder,
  BookmarkAdded,
} from '@mui/icons-material'

/**
 * A reusable card component that displays a title, subtitle, description, and optional image.
 * It includes bookmarking functionality, expandable content with a blur effect, and an external link button.
 */
const CustomCard = ({
  id,
  title,
  subtitle,
  description,
  imageUrl,
  link,
  isBookmarked,
  onBookmarkToggle,
}) => {
  const [expanded, setExpanded] = useState(false)

  return (
    <Card sx={{ width: 320, position: 'relative', margin: '1rem' }}>
      <div>
        <Typography
          level="title-lg"
          sx={{
            overflow: expanded ? 'visible' : 'hidden', // Full title when expanded
            textOverflow: expanded ? 'unset' : 'ellipsis', // Remove ellipsis when expanded
            whiteSpace: expanded ? 'normal' : 'nowrap', // Allow wrapping when expanded
            minHeight: '2rem', // Ensures the title section has consistent height
            pr: '2.5rem',
          }}
        >
          {title}
        </Typography>
        {subtitle && <Typography level="body-sm">{subtitle}</Typography>}
        <IconButton
          aria-label="bookmark"
          variant="plain"
          color="neutral"
          size="sm"
          onClick={() => onBookmarkToggle(id)}
          sx={{ position: 'absolute', top: '0.875rem', right: '0.5rem' }}
        >
          {isBookmarked ? <BookmarkAdded /> : <BookmarkBorder />}
        </IconButton>
      </div>

      {imageUrl && (
        <AspectRatio
          minHeight="120px"
          maxHeight="200px"
          sx={{ marginTop: '0.5rem' }}
        >
          <img src={imageUrl} alt={title} loading="lazy" />
        </AspectRatio>
      )}

      <CardContent
        orientation="horizontal"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          minHeight: '10rem',
        }}
      >
        <Typography
          level="body-sm"
          sx={{
            position: 'relative',
            maxHeight: expanded ? 'none' : '6rem', // Adjust height based on expansion
            overflow: 'hidden',
            maskImage: expanded
              ? 'none'
              : 'linear-gradient(to bottom, rgba(0,0,0,1), rgba(0,0,0,0))',
            WebkitMaskImage: expanded
              ? 'none'
              : 'linear-gradient(to bottom, rgba(0,0,0,1), rgba(0,0,0,0))',
            transition: 'max-height 0.3s ease',
          }}
        >
          {description}
        </Typography>

        <IconButton
          onClick={() => setExpanded(prev => !prev)}
          size="sm"
          sx={{ alignSelf: 'center', marginTop: '0.5rem' }}
        >
          {expanded ? <ExpandLess /> : <ExpandMore />}
        </IconButton>

        {link && <div>{link}</div>}
      </CardContent>
    </Card>
  )
}

export default CustomCard
