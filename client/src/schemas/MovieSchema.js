import { gql } from '@apollo/client'

export const FETCH_MOVIES = gql`
  query {
    allMovie {
      _id
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`

export const FETCH_ONE_MOVIE = gql`
  query ($selectedId: String) {
    oneMovie (_id: $selectedId) {
      _id
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`

export const ADD_MOVIE = gql`
  mutation AddMovie (
    $title: String, 
    $overview: String,
    $poster_path: String,
    $popularity: Float,
    $tags: [String]
    ) {
      addMovie (
        title: $title,
        overview: $overview,
        poster_path: $poster_path,
        popularity: $popularity,
        tags: $tags
      ) {
        _id
        title
        overview
        poster_path
        popularity
        tags
      }
    }
`

export const UPDATE_MOVIE = gql`
  mutation ($id: String, $movieInput: movieInput) {
    updateMovie(_id: $id, inputUpdate: $movieInput) {
      _id
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`

export const DELETE_MOVIE = gql`
  mutation ($selectedId: String) {
    deleteMovie (_id: $selectedId) {
      _id
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`
