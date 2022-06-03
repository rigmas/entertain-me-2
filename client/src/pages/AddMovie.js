import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { useHistory } from 'react-router-dom'


import { ADD_MOVIE, FETCH_MOVIES } from '../schemas/MovieSchema'
import FormMovie from '../components/FormMovie'
import PersistentDrawerLeft from '../components/ResponsiveNav'

export default function AddMovie() {
  
  const history = useHistory()
  
  const [addMovie, { data, loading, error }] = useMutation(ADD_MOVIE, 
    {
      refetchQueries: [{
        query: FETCH_MOVIES
      }]
    }
  )

  const handleSubmit = (newMovie) => {
    
    addMovie({
      variables: {
        title: newMovie.title,
        overview: newMovie.overview,
        poster_path: newMovie.poster_path,
        popularity: newMovie.popularity,
        tags: newMovie.tags
      }
    })
    history.push('/movies')
  }

  return (
    <div className="" style={{color: "white", fontSize: "20px"}} >
      <PersistentDrawerLeft/>
      <h2 style={{textAlign: "center", marginTop: "9%"}}> Add New Movie </h2>

     <FormMovie onSubmit={(newMovie) => handleSubmit(newMovie)} />
      
      
    </div>
  )
}
