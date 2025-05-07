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
} from '@mui/joy'
import { Search, BookmarkBorder } from '@mui/icons-material'
import { toggleBookmark } from '../util/toggleBookmark'
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

const CoursesPage = ({ data }) => {
  const courses = data.courses.nodes
  const [bookmarkedIds, setBookmarkedIds] = useLocalStorage(
    'bookmarkedCourses',
    [],
  )
  const [searchTerm, setSearchTerm] = useState('')
  const [courseDetail, setCourseDetail] = useState(null)

  /**
   * Handles toggling a course's bookmark state.
   */
  const handleBookmarkToggle = id => {
    setBookmarkedIds(prev => toggleBookmark(prev, id))
  }

  // Filter courses based on title search
  const filteredCourses = courses
    .filter(course => {
      if (!searchTerm) return true

      const searchLower = searchTerm.toLowerCase()
      const titleLower = course.title.toLowerCase()
      return titleLower.includes(searchLower)
    })
    .sort((a, b) => a.title.localeCompare(b.title))

  const openCourseDetail = course => {
    setCourseDetail(course)
  }

  const closeCourseDetail = () => {
    setCourseDetail(null)
  }

  return (
    <Box sx={{ maxWidth: '1200px', mx: 'auto', px: { xs: 2, sm: 3 } }}>
      <Typography level="h1" sx={{ mb: 2, mt: 4, color: 'text.primary' }}>
        Data Matters Courses
      </Typography>

      {/* Search */}
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
          placeholder="Search by course title..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          sx={{
            flexGrow: 1,
            minWidth: { xs: '100%', sm: '200px' },
            bgcolor: 'background.surface',
          }}
        />
      </Box>

      {/* Course Grid */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {filteredCourses.map(course => (
          <Grid key={course.id} xs={12} sm={6} md={4}>
            <Box
              sx={{
                height: '100%',
                cursor: 'pointer',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                },
              }}
              onClick={() => openCourseDetail(course)}
            >
              <CustomCard
                id={course.id}
                title={course.title}
                description={course.description}
                link={
                  <Button
                    variant="plain"
                    color="primary"
                    size="sm"
                    component={Link}
                    to={`/courses/${course.slug}`}
                    onClick={e => e.stopPropagation()}
                  >
                    View Course
                  </Button>
                }
                isBookmarked={bookmarkedIds.includes(course.id)}
                onBookmarkToggle={handleBookmarkToggle}
              />
            </Box>
          </Grid>
        ))}
      </Grid>

      {/* Course Detail Modal */}
      {courseDetail && (
        <Modal open={!!courseDetail} onClose={closeCourseDetail}>
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
            <Box sx={{ p: 2 }}>
              <Typography level="h2" sx={{ mb: 2, color: 'text.primary' }}>
                {courseDetail.title}
              </Typography>

              <Stack direction="row" spacing={1} sx={{ mt: 2, mb: 3 }}>
                <Button
                  variant={
                    bookmarkedIds.includes(courseDetail.id) ? 'solid' : 'soft'
                  }
                  color="primary"
                  startDecorator={<BookmarkBorder />}
                  onClick={e => {
                    e.stopPropagation()
                    handleBookmarkToggle(courseDetail.id)
                  }}
                >
                  {bookmarkedIds.includes(courseDetail.id)
                    ? 'Bookmarked'
                    : 'Bookmark'}
                </Button>

                <Button
                  variant="outlined"
                  color="neutral"
                  component={Link}
                  to={`/courses/${courseDetail.slug}`}
                >
                  View Full Course
                </Button>
              </Stack>

              <Typography
                level="title-lg"
                sx={{ mb: 2, color: 'text.primary' }}
              >
                Description
              </Typography>
              <Box sx={{ color: 'text.primary', mb: 3 }}>
                <Markdown>{courseDetail.description}</Markdown>
              </Box>

              {courseDetail.prereqs && (
                <>
                  <Typography
                    level="title-lg"
                    sx={{ mb: 2, color: 'text.primary' }}
                  >
                    Prerequisites
                  </Typography>
                  <Box sx={{ color: 'text.primary' }}>
                    <Markdown>{courseDetail.prereqs}</Markdown>
                  </Box>
                </>
              )}
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
export const Head = () => <Seo title="Courses" />

export default CoursesPage

export const query = graphql`
  {
    courses: allCoursesYaml {
      nodes {
        id
        slug
        title
        description
        prereqs
      }
    }
  }
`
