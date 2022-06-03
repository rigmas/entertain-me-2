import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'

import { useMutation } from '@apollo/client'
import { Modal, Button } from 'react-bootstrap'

import { UPDATE_MOVIE } from '../schemas/MovieSchema'
import FormMovie from './FormMovie'

export default function UpdateModal(props) {
  const history = useHistory()
  const data = props.data
  const [updateMovie, { error }] = useMutation(UPDATE_MOVIE)

  const handleSubmit = (newMovie) => {
    
    console.log(newMovie);
    updateMovie({
      variables: { id: newMovie._id, movieInput: {
      title: newMovie.title,
      overview: newMovie.overview,
      poster_path: newMovie.poster_path,
      popularity: Number(newMovie.popularity),
      tags: newMovie.tags
      }}
    })
    history.push('/movies')
  }
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.data.title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <FormMovie onSubmit={(newMovie) => handleSubmit(newMovie)}
          data={data}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}