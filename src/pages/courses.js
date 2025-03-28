import React, { useState, Fragment } from 'react'
import Seo from '../components/seo'
import { graphql } from 'gatsby'
import { Details } from '../components/details'
import { Link } from '../components/link'
import CustomCard from '../components/card'
import { IconButton, Grid } from '@mui/joy/'
import { toggleBookmark } from '../util/toggleBookmark'
import { FilterList, FilterListOff } from '@mui/icons-material'

const CoursesPage = ({ data }) => {
  const [bookmarkedIds, setBookmarkedIds] = useState([])
  const [showOnlyBookmarked, setShowOnlyBookmarked] = useState(false)

  /**
   * Handles toggling an instructor's bookmark state.
   * If the instructor is already bookmarked, it removes them; otherwise, it adds them.
   */
  const handleBookmarkToggle = id => {
    setBookmarkedIds(prev => toggleBookmark(prev, id))
  }

  // Sort courses alphabetically
  const courses = data.courses.nodes.sort((c, d) =>
    c.title < d.title ? -1 : 1,
  )

  const filteredCourses = showOnlyBookmarked
    ? courses.filter(course => bookmarkedIds.includes(course.id))
    : courses

  return (
    <Fragment>
      <h1>course catalog</h1>

      <IconButton
        variant="soft"
        color="secondary"
        onClick={() => setShowOnlyBookmarked(prev => !prev)}
        sx={{
          ml: '2rem',
          mb: 2,
          borderRadius: '2px',
          p: 2,
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          transition: 'all 0.25s',
          '&:hover': {
            boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
            transform: 'scale(1.05)',
            backgroundColor: 'rgba(0, 0, 0, 0.04)',
          },
        }}
      >
        {showOnlyBookmarked ? <FilterListOff /> : <FilterList />}
      </IconButton>

      <Grid
        container
        spacing={2}
        sx={{
          justifyContent:
            bookmarkedIds.length < 3 && showOnlyBookmarked
              ? 'flex-start'
              : 'space-between',
          flexGrow: 1,
          p: 2,
        }}
      >
        {filteredCourses.map(course => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={`course-${course.id}`}>
            <CustomCard
              id={course.id}
              title={course.title}
              description={course.description}
              link={<Link to={course.path} />}
              isBookmarked={bookmarkedIds.includes(course.id)}
              onBookmarkToggle={handleBookmarkToggle}
            />
          </Grid>
        ))}
      </Grid>

      <Details title="data" data={data} />
    </Fragment>
  )
}

export const Head = () => <Seo title="Courses" />

export default CoursesPage

export const query = graphql`
  {
    courses: allCoursesYaml {
      nodes {
        id
        path
        title
        description
        prereqs
      }
    }
  }
`
