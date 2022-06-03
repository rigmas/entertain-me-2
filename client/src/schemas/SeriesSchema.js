import { gql } from '@apollo/client'

export const FETCH_SERIES = gql`
  query {
    allTvSeries {
      _id
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`