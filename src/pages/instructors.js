import React, { useState, useEffect } from 'react'
import { graphql } from 'gatsby'
import Seo from '../components/seo'
import { Details } from '../components/details'
import { Link } from '../components/link'
import CustomCard from '../components/card'
import {
  Box,
  Grid,
  Typography,
  Button,
  Input,
  Stack,
  Modal,
  ModalClose,
  ModalDialog,
  AspectRatio,
} from '@mui/joy'
import { Search, BookmarkBorder, School } from '@mui/icons-material'
import { toggleBookmark } from '../util/toggleBookmark'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { Markdown } from '../components/markdown'

// Custom hook to manage localStorage for bookmarks
const useLocalStorage = (key, initialValue) => {
  // Get from local storage if available
  const [storedValue, setStoredValue] = useState(() => {
    if (typeof window !== 'undefined') {
      try {
        const item = window.localStorage.getItem(key)
        return item ? JSON.parse(item) : initialValue
      } catch (error) {
        console.log(error)
        return initialValue
      }
    }
    return initialValue
  })

  // Store in localStorage when value changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        window.localStorage.setItem(key, JSON.stringify(storedValue))
      } catch (error) {
        console.log(error)
      }
    }
  }, [key, storedValue])

  return [storedValue, setStoredValue]
}

const InstructorsPage = ({ data }) => {
  const instructors = data.instructors.nodes
  const [bookmarkedIds, setBookmarkedIds] = useLocalStorage(
    'bookmarkedInstructors',
    [],
  )
  const [searchTerm, setSearchTerm] = useState('')
  const [instructorDetail, setInstructorDetail] = useState(null)

  /**
   * Handles toggling an instructor's bookmark state.
   */
  const handleBookmarkToggle = id => {
    setBookmarkedIds(prev => toggleBookmark(prev, id))
  }

  // Filter instructors based only on the name search
  const filteredInstructors = instructors
    .filter(instructor => {
      if (!searchTerm) return true

      const searchLower = searchTerm.toLowerCase()
      const fullName = instructor.full_name.toLowerCase()
      return fullName.includes(searchLower)
    })
    .sort((a, b) => a.full_name.localeCompare(b.full_name))

  const openInstructorDetail = instructor => {
    setInstructorDetail(instructor)
  }

  const closeInstructorDetail = () => {
    setInstructorDetail(null)
  }

  return (
    <Box sx={{ maxWidth: '1200px', mx: 'auto', px: { xs: 2, sm: 3 } }}>
      <Typography level="h1" sx={{ mb: 2, mt: 4, color: 'text.primary' }}>
        Data Matters Instructors
      </Typography>

      {/* Simple Search */}
      <Box
        sx={{
          mb: 3,
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: { xs: 'stretch', sm: 'center' },
          gap: 2,
        }}
      >
        <Input
          startDecorator={<Search />}
          placeholder="Search by instructor name..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          sx={{
            flexGrow: 1,
            minWidth: { xs: '100%', sm: '200px' },
            bgcolor: 'background.surface',
          }}
        />
      </Box>

      {/* Instructor Grid */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {filteredInstructors.map(instructor => (
          <Grid key={instructor.id} xs={12} sm={6} md={4} lg={4}>
            <Box
              sx={{
                height: '100%',
                cursor: 'pointer',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                },
              }}
              onClick={() => openInstructorDetail(instructor)}
            >
              <CustomCard
                id={instructor.id}
                title={instructor.full_name}
                subtitle={instructor.affiliation}
                description={instructor.bio}
                profileImage={instructor.image}
                link={
                  instructor.url && (
                    <Button
                      variant="plain"
                      color="primary"
                      size="sm"
                      component={Link}
                      to={instructor.url}
                      onClick={e => e.stopPropagation()}
                    >
                      Website
                    </Button>
                  )
                }
                isBookmarked={bookmarkedIds.includes(instructor.id)}
                onBookmarkToggle={handleBookmarkToggle}
              />
            </Box>
          </Grid>
        ))}
      </Grid>

      {/* Instructor Detail Modal */}
      {instructorDetail && (
        <Modal open={!!instructorDetail} onClose={closeInstructorDetail}>
          <ModalDialog
            sx={{
              width: { sm: '90%', md: '80%' },
              maxWidth: '900px',
              maxHeight: '90vh',
              overflow: 'auto',
              bgcolor: 'background.surface',
              color: 'text.primary',
            }}
          >
            <ModalClose />
            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                gap: 3,
              }}
            >
              <Box
                sx={{
                  flexShrink: 0,
                  width: { xs: '100%', md: '30%' },
                  minWidth: { md: '250px' },
                }}
              >
                <AspectRatio
                  ratio="1"
                  sx={{ mb: 2, borderRadius: 'md', overflow: 'hidden' }}
                >
                  {instructorDetail.image ? (
                    <GatsbyImage
                      image={getImage(instructorDetail.image)}
                      alt={`${instructorDetail.full_name} Profile`}
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
                      <School sx={{ fontSize: 80 }} />
                    </Box>
                  )}
                </AspectRatio>

                <Typography level="h2" sx={{ mb: 1, color: 'text.primary' }}>
                  {instructorDetail.full_name}
                </Typography>

                {instructorDetail.affiliation && (
                  <Typography
                    level="title-md"
                    sx={{ mb: 2, color: 'text.secondary' }}
                  >
                    {instructorDetail.affiliation}
                  </Typography>
                )}

                <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
                  <Button
                    variant={
                      bookmarkedIds.includes(instructorDetail.id)
                        ? 'solid'
                        : 'soft'
                    }
                    color="primary"
                    startDecorator={<BookmarkBorder />}
                    onClick={e => {
                      e.stopPropagation()
                      handleBookmarkToggle(instructorDetail.id)
                    }}
                    fullWidth
                  >
                    {bookmarkedIds.includes(instructorDetail.id)
                      ? 'Bookmarked'
                      : 'Bookmark'}
                  </Button>

                  {instructorDetail.url && (
                    <Button
                      variant="outlined"
                      color="neutral"
                      component={Link}
                      to={instructorDetail.url}
                      fullWidth
                    >
                      Website
                    </Button>
                  )}
                </Stack>
              </Box>

              <Box sx={{ flex: 1, overflowY: 'auto' }}>
                <Typography
                  level="title-lg"
                  sx={{ mb: 2, color: 'text.primary' }}
                >
                  About
                </Typography>
                <Box sx={{ color: 'text.primary' }}>
                  <Markdown>{instructorDetail.bio}</Markdown>
                </Box>
              </Box>
            </Box>
          </ModalDialog>
        </Modal>
      )}

      {/* Debug information - hidden in production */}
      {process.env.NODE_ENV !== 'production' && (
        <Details title="data" data={data} />
      )}
    </Box>
  )
}

/**
 * Head export to define metadata for the page
 */
export const Head = () => <Seo title="Instructors" />

export default InstructorsPage

export const query = graphql`
  {
    instructors: allInstructorsYaml {
      nodes {
        id
        slug
        full_name
        url
        image {
          childImageSharp {
            gatsbyImageData(
              width: 500
              height: 500
              placeholder: BLURRED
              transformOptions: { fit: COVER, cropFocus: CENTER }
            )
          }
        }
        bio
        affiliation
      }
    }
  }
`
