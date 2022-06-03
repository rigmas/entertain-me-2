import { gql } from '@apollo/client'
import client from '../config/client'

export const FETCH_FAVORITES = gql`
  query {
    favorites {
      _id,
      title,
      overview,
      poster_path,
      popularity,
      tags
    }
  }
`

client.writeQuery({
  query: FETCH_FAVORITES,
  data: {
    favorites: [
      {
      _id: "5f8564484a963b0a62d828af",
      title: "Pulp Fiction",
      overview: "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
      poster_path: "http://barkerhost.com/wp-content/uploads/sites/4/2015/11/dM2w364MScsjFf8pfMbaWUcWrR-0.jpg",
      popularity: 4.8,
      tags: ["drama"]
     },
      {
      _id: "5f8564484a963b0a62d828af",
      title: "Pulp Fiction",
      overview: "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
      poster_path: "http://barkerhost.com/wp-content/uploads/sites/4/2015/11/dM2w364MScsjFf8pfMbaWUcWrR-0.jpg",
      popularity: 4.8,
      tags: ["drama"]
     },
      {
      _id: "5f8564484a963b0a62d828af",
      title: "Pulp Fiction",
      overview: "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
      poster_path: "http://barkerhost.com/wp-content/uploads/sites/4/2015/11/dM2w364MScsjFf8pfMbaWUcWrR-0.jpg",
      popularity: 4.8,
      tags: ["drama"]
     },
      {
      _id: "5f82f57af70d351ee7e8bd42",
      title: "The Immitation Game",
      overview: "During World War II, the English mathematical genius Alan Turing tries to crack the German Enigma code with help from fellow mathematicians.",
      poster_path: "https://images-na.ssl-images-amazon.com/images/I/81b%2BG%2BRIkkL._AC_SL1500_.jpg",
      popularity: 4.9,
      tags: ["historical", "drama"]
     }
  ]
  }
})