import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
// import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MovieIcon from '@material-ui/icons/Movie';
import TvIcon from '@material-ui/icons/Tv';
import HomeIcon from '@material-ui/icons/Home';
import QueuePlayNextIcon from '@material-ui/icons/QueuePlayNext';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';

import { NavLink } from 'react-router-dom'

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
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
}));

export default function PersistentDrawerLeft() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          {/* <Typography variant="h5" noWrap> */}
            <h1 style={{marginTop: '0.2%'}}> Cinéville </h1>
          {/* </Typography> */}
        </Toolbar>
      </AppBar>

      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          <ListItem button key='Home'>
            <ListItemIcon><HomeIcon/></ListItemIcon>
            <NavLink to='/' style={{textDecoration: 'none'}}>
              <h5 style={{color: '#2C3948', marginTop: '12%'}}>
                Home
              </h5>
              
            </NavLink>
          </ListItem>

          <ListItem button key='Movies'>
            <ListItemIcon><MovieIcon/></ListItemIcon>
            <NavLink to='/movies' style={{textDecoration: 'none'}}>
              <h5 style={{color: '#2C3948', marginTop: '12%'}}>
                Movies
              </h5>
            </NavLink>
          </ListItem>

          <ListItem button key='TVSeries'>
            <ListItemIcon><TvIcon/></ListItemIcon>
            <NavLink to='/series' style={{textDecoration: 'none'}}>
            <h5 style={{color: '#2C3948', marginTop: '8%'}}>
                TV Series
              </h5>
            </NavLink>
          </ListItem>
        </List>
        <Divider />

        <List>
          <ListItem button key='AddMovie'>
              <ListItemIcon><QueuePlayNextIcon/></ListItemIcon>
              <NavLink to='/movies/add' style={{textDecoration: 'none'}}>
              <h5 style={{color: '#2C3948', marginTop: '6%'}}>
                New Movies
              </h5>
              </NavLink>
            </ListItem>

          <ListItem button key='ListFavorite'>
              <ListItemIcon><FavoriteBorderIcon/></ListItemIcon>
              <NavLink to='/favorites' style={{textDecoration: 'none'}}>
              <h5 style={{color: '#2C3948', marginTop: '6%'}}>
                Favorites
              </h5>
              </NavLink>
            </ListItem>
        </List>

      </Drawer>
    
    </div>
  );
}
