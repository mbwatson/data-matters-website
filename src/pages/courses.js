import React, { useState, Fragment } from 'react'
import Seo from '../components/seo'
import { graphql } from 'gatsby'
import { Details } from '../components/details'
import { Link } from '../components/link'
import CustomCard from '../components/card'
import { IconButton, Grid } from '@mui/joy/'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import { toggleBookmark } from '../util/toggleBookmark'

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
        variant="solid"
        color="primary"
        onClick={() => setShowOnlyBookmarked(prev => !prev)}
        sx={{ marginBottom: '1rem' }}
      >
        {showOnlyBookmarked ? <VisibilityOffIcon /> : <VisibilityIcon />}
      </IconButton>

      <Grid container spacing={2} sx={{ flexGrow: 1 }}>
        {filteredCourses.map(course => (
          <Grid size={{ xs: 12, md: 6, lg: 4 }} key={`course-${course.id}`}>
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
