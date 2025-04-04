import React, { useState, Fragment } from 'react'
import { graphql } from 'gatsby'
import Seo from '../components/seo'
import { Details } from '../components/details'
import { Link } from '../components/link'
import CustomCard from '../components/card'
import { IconButton } from '@mui/joy/'
import { FilterList, FilterListOff } from '@mui/icons-material'
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

      {filteredInstructors.map(instructor => (
        <CustomCard
          id={instructor.id}
          title={instructor.full_name}
          subtitle={instructor.affiliation}
          description={instructor.bio}
          link={<Link to={instructor.url} />}
          // imageUrl={instructor.image}
          isBookmarked={bookmarkedIds.includes(instructor.id)}
          onBookmarkToggle={handleBookmarkToggle}
        />
      ))}

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
