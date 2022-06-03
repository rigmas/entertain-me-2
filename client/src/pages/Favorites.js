import React from 'react'
import client from '../config/client'
import clsx from 'clsx'

import { FETCH_FAVORITES } from '../schemas/FavoriteSchema'
import Carousel from '../components/Carousel'
import PersistentDrawerLeft from '../components/ResponsiveNav'
import MovieCard from '../components/MovieCard'

import "../styles/DetailMovie.css"
import { useTheme, makeStyles } from '@material-ui/core'

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}))

export default function Favorites() {

  const classes = useStyles()
  const theme = useTheme()
  const [open, setOpen] = React.useState(false)

  const { favorites } = client.readQuery({
    query: FETCH_FAVORITES
  })

  let finalData = []
  favorites
  ? finalData = favorites
  : finalData = favorites

  return (
    <div className="movie-page-wrapper">
      <PersistentDrawerLeft/>
      
      <Carousel title='Favorites' data={finalData} />
      
    </div>
  )
}
