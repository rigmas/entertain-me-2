import React, { useState } from 'react'
import { useQuery } from '@apollo/client'

import clsx from 'clsx'
import { makeStyles, useTheme } from '@material-ui/core/styles';

import { FETCH_ALL } from '../schemas/AllQueries'
import Carousel from '../components/Carousel'
import PersistentDrawerLeft from '../components/ResponsiveNav'

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
}))


export default function Homepage() {
  const classes = useStyles()
  const theme = useTheme()
  const [open, setOpen] = React.useState(false)

  const { loading, error, data } = useQuery(FETCH_ALL)

  if (loading) {
    return <p>Loading...</p>
  }

  if (error) {
    return <p> {JSON.stringify(error)} </p>
  }

  let finalData = []
  if (data) {
    finalData = finalData.concat(data.allTvSeries)
    finalData = finalData.concat(data.allMovie)
  }
  
  
  if (finalData) {
   console.log(data.allSeries);
      return (
        <div className="movie-page-wrapper">
          <PersistentDrawerLeft/>
          <Carousel title='Cineville' data={finalData}/>
          <main
      className={clsx(classes.content, {
        [classes.contentShift]: open,
      })}
      >

      </main>
        </div>
      )
    
    
  }
}
