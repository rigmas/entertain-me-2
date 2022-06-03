import React from 'react'
import { Link } from "react-router-dom"

import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';


const useStyles = makeStyles ({
  media: {
    margin: '0 auto'
  }
})

export default function MovieCard(props) {
  const classes = useStyles()

  return (
    <>
      <Card style={{
        width: 400,
        backgroundColor: 'black',
        color: 'white',
        margin: '0 0.4em',
      }}>
        
        <Link
          style={{ color: 'white', textDecoration: 'none' }}
          to={`/movies/${props._id}`}
        >
          <CardActionArea >
            <CardMedia
              className=""
              style={{
                height: 425,
                width: 355,
                margin: '9%',
                alignItems: 'center',
                justify: 'center',
                paddingLeft: '2%'
              }}
              title="Cineville"
            >
              
              <img src={props.poster_path} 
                style={{ 
                  height: "26rem", 
                  width: "19rem",
                  // justifyContent: "center"
                }}
              />
              
            </CardMedia>
            <CardContent>
              <div style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                textAlign: 'center' }}
              >
                <h5><b> {props.title} </b></h5> 
                <p> Rating: {props.popularity} </p>   
              </div>
            </CardContent>
          </CardActionArea>
        </Link>
      </Card>
      
      
    </>
  )
}

