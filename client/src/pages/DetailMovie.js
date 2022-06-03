import React, { useEffect, useState } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { Link, useParams, useLocation, useHistory } from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles';
import { 
  Box,
  Card,
  CardActionArea, 
  CardActions, 
  CardContent,
  CardMedia,
  Button,
  Typography } from '@material-ui/core'
import StarIcon from '@material-ui/icons/Star';
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import FavoriteIcon from '@material-ui/icons/Favorite';

import PersistentDrawerLeft from '../components/ResponsiveNav'
import UpdateModal from '../components/UpdateModal'
import { FETCH_MOVIES, FETCH_ONE_MOVIE } from '../schemas/MovieSchema'
import { DELETE_MOVIE } from '../schemas/MovieSchema'

import '../styles/DetailMovie.css'
import { FETCH_FAVORITES } from '../schemas/FavoriteSchema';
import client from '../config/client';


const styles = {
   container: {
    position: "relative",
    maxWidth: '1200px'
   }
}
export default function DetailMovie() {
  // const classes = useStyles();
  
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [modalShow, setModalShow] = React.useState(false)

  
  const { id } = useParams()
  const history = useHistory()

  const { loading, data } = useQuery(FETCH_ONE_MOVIE, {
    variables: { selectedId: id }
  })

  const [deleteMovie] = useMutation(DELETE_MOVIE,
    {
      refetchQueries: [{
        query: FETCH_MOVIES
      }]
    }
  )
  const handleDeleteMovie = () => {
    deleteMovie({ variables: { selectedId: id }})
    history.push('/movies')
  }

  const handleFavoriteMovie = () => {
    const { favorites: listFavorite } = client.readQuery({
      query: FETCH_FAVORITES
    })
    
    client.writeQuery({
      query: FETCH_FAVORITES,
      data: {
        favorites: listFavorite.concat(data.oneMovie)
      }
    })
    history.push('/favorites')
  }

  if (loading) {
    return <p>Loading...</p>
  }
  
  return (
    
    <>
      <PersistentDrawerLeft/>

      <UpdateModal
        show={modalShow}
        data={data.oneMovie}
        onHide={() => setModalShow(false)}
      />
        <div className="container" style={{marginTop: "12.5%"}}>
      <Card style={{background: "black"}}>
        
        <div className="row">
          <div className="col-sm-3 col-md-6 col-lg-4">
            <img src={data.oneMovie.poster_path}
              style={{width: "25em", height: "37.5em"}}
            />
          </div>
          
          
          <div className="col-sm-9 col-md-6 col-lg-8">
            <h1 style={{textAlign: "center", color: "white", marginTop: "3%", marginBottom: "5%"}}> {data.oneMovie.title} </h1>
      
            <div className="row" style={{marginBottom: "3%", marginLeft: "5%"}}>
              
              <Button onClick={() => setModalShow(true)} >
                <CreateIcon style={{ color: "#7CCFA9", fontSize: "35px" }} />
                <h6 style={{color: "white", marginLeft: "2%", marginTop: "1.1%", fontSize: "20px"}}>Update</h6>
              </Button>

              <Button onClick={() => handleFavoriteMovie()}>
                <FavoriteIcon style={{ color: "#FF707D", fontSize: "35px", marginLeft: "50%" }} />
                <h6 style={{color: "white", marginLeft: "5%", marginTop: ".9%", fontSize: "20px"}}>Favorite</h6>
              </Button>
              
                <StarIcon style={{ color: "gold", marginLeft: "7.5%", marginTop: ".2%",  fontSize: "35px"}}/>
                <h6 style={{color: "white", marginLeft: "1.5%", marginTop: "1.2%", fontSize: "21px"}}> {data.oneMovie.popularity} </h6>

                
              
            </div>
            
            <div className="row" style={{marginBottom: "7.5%", marginLeft: "5%"}}>
              <Button onClick={() => handleDeleteMovie()}>
                <DeleteIcon style={{ color: "#FF707D", fontSize: "35px" }} />
                <h6 style={{color: "white", marginLeft: "2%", marginTop: ".9%", fontSize: "20px"}}>Delete</h6>
              </Button>

            
            </div>

              <div style={{marginLeft: "5%", marginBottom: "7%"}}>
                <h4 className="text-muted" style={{color: "white"}}>Overview:</h4>
                <h6 style={{color: "white", marginLeft: "3%", fontSize: "20px", marginRight: "5%"}}> {data.oneMovie.overview} </h6>
              </div>
            
            <div style={{marginLeft: "5%"}}>
              <h5 className="text-muted" style={{color: "white"}}>Genre:</h5>
              {data.oneMovie.tags.map((tag, i) => {
                return (
                  <p style={{color: "white", paddingLeft: "2%"}}> {tag.toUpperCase()} </p>
                )
              })}
            </div>

            
          </div>
        </div>
      </Card>
        </div>
    </>
    
  )
  
}
