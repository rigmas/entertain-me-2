import React from 'react'
import { useQuery } from '@apollo/client'
import clsx from 'clsx'
import { makeStyles, useTheme } from '@material-ui/core/styles';

import { FETCH_ALL } from "../schemas/AllQueries"
import Carousel from '../components/Carousel'
import PersistenDrawerLeft from '../components/ResponsiveNav'
import { FETCH_SERIES } from '../schemas/SeriesSchema';


const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex'
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    marginTop: 500,
    padding: theme.spacing(0, 1),
  
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end'
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
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  topSeparator: {
    marginBottom: 100
  }
}))

export default function SeriesPage() {

  const classes = useStyles()
  const theme = useTheme()
  const [open, setOpen] = React.useState(false)
  const { loading, error, data } = useQuery(FETCH_SERIES)

  if (loading) {
    return <p>Loading...</p>
  }

  if (error) {
    return <p>{JSON.stringify(error)}</p>
  }

  let finalData = []

  data.allTvSeries
  ? finalData = data.allTvSeries
  : finalData = data.allMovie
  
  console.log(data);

  return (
    <div className={classes.root}>
      <PersistenDrawerLeft/>
      <div className={classes.drawerHeader} />
      
        <Carousel title='In Cinema' data={finalData} />
      
      <main
      className={clsx(classes.content, {
        [classes.contentShift]: open,
      })}
      >
        
      </main>
      
    </div>
  )
}

