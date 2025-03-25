import React, { useState, Fragment } from 'react'
import { graphql } from 'gatsby'
import Seo from '../components/seo'
import { Details } from '../components/details'
import { Link } from '../components/link'
import CustomCard from '../components/card'
import { IconButton, Grid } from '@mui/joy/'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import { toggleBookmark } from '../util/toggleBookmark'

const InstructorsPage = ({ data }) => {
  const instructors = data.instructors.nodes
  const [bookmarkedIds, setBookmarkedIds] = useState([])
  const [showOnlyBookmarked, setShowOnlyBookmarked] = useState(false)

  /**
   * Handles toggling an instructor's bookmark state.
   * If the instructor is already bookmarked, it removes them; otherwise, it adds them.
   */
  const handleBookmarkToggle = id => {
    setBookmarkedIds(prev => toggleBookmark(prev, id))
  }

  const filteredInstructors = showOnlyBookmarked
    ? instructors.filter(instructor => bookmarkedIds.includes(instructor.id))
    : instructors

  return (
    <Fragment>
      <h1>instructors</h1>

      <IconButton
        variant="solid"
        color="primary"
        onClick={() => setShowOnlyBookmarked(prev => !prev)}
        sx={{ marginBottom: '1rem' }}
      >
        {showOnlyBookmarked ? <VisibilityOffIcon /> : <VisibilityIcon />}
      </IconButton>

      <Grid container spacing={2} sx={{ flexGrow: 1 }}>
        {filteredInstructors.map(instructor => (
          <Grid
            size={{ xs: 12, md: 6, lg: 4 }}
            key={`instructor-${instructor.id}`}
          >
            <CustomCard
              id={instructor.id}
              title={instructor.full_name}
              subtitle={instructor.affiliation}
              description={instructor.bio}
              link={<Link to={instructor.url} />}
              isBookmarked={bookmarkedIds.includes(instructor.id)}
              onBookmarkToggle={handleBookmarkToggle}
            />
          </Grid>
        ))}
      </Grid>

      <Details title="data" data={data} />
    </Fragment>
  )
}

/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
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
        bio
        affiliation
      }
    }
  }
`
