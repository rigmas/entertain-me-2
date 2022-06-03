import React, { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { useHistory } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'

// import { ADD_MOVIE, FETCH_MOVIES } from '../schemas/MovieSchema'

export default function FormMovie(props) {
  
  const history = useHistory()
  const [_id, set_id] = useState('')
  const [title, setTitle] = useState('')
  const [overview, setOverview] = useState('')
  const [poster_path, setPoster] = useState('')
  const [popularity, setPopularity] = useState()
  const [tags, setTags] = useState([])
  // const [addMovie, { data, loading, error }] = useMutation(ADD_MOVIE)

  useEffect(() => {
    if (props.data) {
      set_id(props.data._id)
      setTitle(props.data.title)
      setOverview(props.data.overview)
      setPoster(props.data.poster_path)
      setPopularity(props.data.popularity)
      setTags(props.data.tags)
    }
  },[props.data])
  
  // console.log(props.data);

  function handleGetTitle(e) {
    setTitle(e.target.value)
  }
  function handleGetOverview(e) {
    setOverview(e.target.value)
  }
  function handleGetPoster(e) {
    setPoster(e.target.value)
  }
  function handleGetPopularity(e) {
    setPopularity(e.target.value)
  }
  function handleGetTags(e) {
    setTags(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(props);
    props.onSubmit({
      _id,
      title,
      overview,
      poster_path,
      popularity: Number(popularity),
      tags
    })
    
    // if (props.data) {
    //   console.log('asd');
    // } else {
    //   addMovie({
    //     variables: {
    //       title,
    //       overview,
    //       poster_path,
    //       popularity: Number(popularity),
    //       tags
    //     }
    //   })
    //   }
    history.push('/movies')
  }

  return (
    <div className="container">
      {/* <h3> Add New Movie </h3> */}

      <Form onSubmit={ (e) => handleSubmit(e) }>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Title</Form.Label>
          <Form.Control 
            type="text" placeholder="Input title" value={title}
            onChange={ (e) => handleGetTitle(e) }
          />
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
          <Form.Label>Overview</Form.Label>
          <Form.Control 
            type="text" placeholder="Input overview" value={overview}
            onChange={ (e) => handleGetOverview(e) }
          />
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
          <Form.Label>Poster</Form.Label>
          <Form.Control 
            type="text" placeholder="Input poster" value={poster_path}
            onChange={ (e) => handleGetPoster(e) }
          />
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
          <Form.Label>Popularity</Form.Label>
          <Form.Control 
            type="text" placeholder="Input popularity" value={popularity} 
            onChange={ (e) => handleGetPopularity(e) }
          />
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
          <Form.Label>Tags</Form.Label>
          <Form.Control 
            type="text" placeholder="Input tags" value={tags}
            onChange={ (e) => handleGetTags(e) }
          />
        </Form.Group>
       
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      
      
    </div>
  )
}
