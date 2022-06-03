import { gql } from '@apollo/client'

export const FETCH_ALL = gql`
  query {
    allMovie {
      _id
      title
      overview
      poster_path
      popularity
      tags
    }

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