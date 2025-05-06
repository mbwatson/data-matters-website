import React, { useState } from 'react'
import {
  Card,
  CardContent,
  CardOverflow,
  AspectRatio,
  IconButton,
  Typography,
  Box,
  Divider,
  Stack,
} from '@mui/joy'
import {
  ExpandMore,
  ExpandLess,
  BookmarkBorder,
  BookmarkAdded,
  School,
} from '@mui/icons-material'
import { Markdown } from './markdown'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'

/**
 * A reusable card component that displays instructor information with improved layout and visual hierarchy.
 * Features include bookmarking and expandable content.
 */
const CustomCard = ({
  id,
  title,
  subtitle,
  description,
  profileImage,
  link,
  isBookmarked,
  onBookmarkToggle,
  tags = [],
}) => {
  const [expanded, setExpanded] = useState(false)

  return (
    <Card
      variant="outlined"
      sx={{
        width: '100%',
        height: expanded ? 'auto' : '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'all 0.3s ease',
        '&:hover': {
          boxShadow: 'md',
          borderColor: 'primary.300',
        },
        borderRadius: 'md',
        overflow: 'hidden',
        bgcolor: 'background.surface',
      }}
    >
      <CardOverflow>
        <AspectRatio ratio="16/9" maxHeight={200}>
          {profileImage ? (
            <GatsbyImage
              image={getImage(profileImage)}
              alt={`${title} Profile`}
              style={{ objectFit: 'cover' }}
            />
          ) : (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: 'primary.100',
                color: 'primary.800',
              }}
            >
              <School sx={{ fontSize: 60 }} />
            </Box>
          )}
          <IconButton
            aria-label="bookmark"
            variant={isBookmarked ? 'solid' : 'soft'}
            color={isBookmarked ? 'primary' : 'neutral'}
            size="sm"
            onClick={e => {
              e.stopPropagation()
              onBookmarkToggle(id)
            }}
            sx={{
              position: 'absolute',
              top: '0.5rem',
              right: '0.5rem',
              zIndex: 2,
              bgcolor: isBookmarked
                ? 'primary.500'
                : 'rgba(255, 255, 255, 0.8)',
              '&:hover': {
                bgcolor: isBookmarked
                  ? 'primary.600'
                  : 'rgba(255, 255, 255, 0.9)',
              },
            }}
          >
            {isBookmarked ? <BookmarkAdded /> : <BookmarkBorder />}
          </IconButton>
        </AspectRatio>
      </CardOverflow>

      <CardContent sx={{ p: 2, flexGrow: 1 }}>
        <Typography level="title-lg" sx={{ mb: 0.5, color: 'text.primary' }}>
          {title}
        </Typography>

        {subtitle && (
          <Typography level="body-sm" sx={{ mb: 1.5, color: 'text.secondary' }}>
            {subtitle}
          </Typography>
        )}

        {tags.length > 0 && (
          <Stack
            direction="row"
            spacing={1}
            sx={{ mb: 1.5, flexWrap: 'wrap', gap: 0.5 }}
          >
            {tags.map((tag, index) => (
              <Box
                key={index}
                sx={{
                  px: 1,
                  py: 0.5,
                  borderRadius: 'sm',
                  bgcolor: 'primary.100',
                  color: 'primary.700',
                  fontSize: 'xs',
                }}
              >
                {tag}
              </Box>
            ))}
          </Stack>
        )}

        <Divider sx={{ my: 1.5 }} />

        <Box sx={{ position: 'relative', mb: 1 }}>
          <Box
            sx={{
              maxHeight: expanded ? 'none' : '120px',
              overflow: 'hidden',
              transition: 'max-height 0.5s ease',
            }}
          >
            <Typography level="body-md" sx={{ mb: 2, color: 'text.primary' }}>
              <Markdown>{description}</Markdown>
            </Typography>
          </Box>
        </Box>
      </CardContent>

      <CardOverflow
        sx={{
          borderTop: '1px solid',
          borderColor: 'divider',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          p: 1,
          bgcolor: 'background.level1',
        }}
      >
        {link && <Box sx={{ ml: 1 }}>{link}</Box>}

        <IconButton
          onClick={() => setExpanded(prev => !prev)}
          size="sm"
          variant="soft"
          color="neutral"
          sx={{ ml: 'auto' }}
          aria-label={expanded ? 'Show less' : 'Show more'}
        >
          {expanded ? <ExpandLess /> : <ExpandMore />}
        </IconButton>
      </CardOverflow>
    </Card>
  )
}

export default CustomCard
