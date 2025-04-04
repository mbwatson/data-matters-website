import React, { useState } from 'react'
import {
  AspectRatio,
  Card,
  CardContent,
  IconButton,
  Typography,
  Box,
  Stack,
} from '@mui/joy'
import {
  ExpandMore,
  ExpandLess,
  BookmarkBorder,
  BookmarkAdded,
} from '@mui/icons-material'
import { Markdown } from './markdown'

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
    <Card
      sx={{
        flexGrow: 1,
        position: 'relative',
        margin: '1rem',
        minHeight: '20rem',
      }}
    >
      {imageUrl && (
        <AspectRatio
          minHeight="120px"
          maxHeight="200px"
          sx={{ marginTop: '0.5rem' }}
        >
          <img src={imageUrl} alt={title} loading="lazy" />
        </AspectRatio>
      )}

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
        <Stack
          sx={{
            flexDirection: 'row',
            position: 'absolute',
            top: '0.875rem',
            right: '0.5rem',
            gap: 2,
          }}
        >
          {link && <Box sx={{ pt: 0.5 }}>{link}</Box>}
          <IconButton
            aria-label="bookmark"
            variant="plain"
            color="neutral"
            size="sm"
            onClick={() => onBookmarkToggle(id)}
          >
            {isBookmarked ? <BookmarkAdded /> : <BookmarkBorder />}
          </IconButton>
        </Stack>
      </div>

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
        <div
          style={{
            maxHeight: expanded ? 'none' : '10rem',
            overflow: 'hidden',
            transition: 'max-height 0.5s ease, padding 0.3s ease',
            paddingBottom: expanded ? '2rem' : '0rem',
          }}
        >
          <Typography
            level="body-sm"
            sx={{
              position: 'relative',
              maxHeight: expanded ? 'none' : '10rem',
              overflow: 'hidden',
              pb: 4,
              maskImage: expanded
                ? 'none'
                : 'linear-gradient(to bottom, rgba(0,0,0,1), rgba(0,0,0,0.1))',
              WebkitMaskImage: expanded
                ? 'none'
                : 'linear-gradient(to bottom, rgba(0,0,0,1), rgba(0,0,0,0.1))',
            }}
          >
            <Markdown>{description}</Markdown>
          </Typography>
        </div>

        <IconButton
          onClick={() => setExpanded(prev => !prev)}
          size="sm"
          sx={{
            position: 'absolute',
            bottom: '1rem',
            alignSelf: 'center',
          }}
        >
          {expanded ? <ExpandLess /> : <ExpandMore />}
        </IconButton>
      </CardContent>
    </Card>
  )
}

export default CustomCard
