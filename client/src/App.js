import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route } from 'react-router-dom'
  
import { ApolloProvider } from '@apollo/client'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import client from './config/client'
import MoviePage from './pages/MoviePage';
import SeriesPage from './pages/SeriesPage'
import DetailMovie from './pages/DetailMovie'
import AddMovie from './pages/AddMovie'
import FavoritePage from './pages/Favorites'
import Homepage from './pages/Homepage'

const styles = {
  bodyWrapper: {
    backgroundColor: '#2D3848'
  },
  pageWrapper: {
    fontFamily: 'Quicksand',
    height: '100vh',
    backgroundColor: '#2D3848',
    paddingBottom: "20%"
  }
}

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="row" style={styles.pageWrapper}>
          <div className="col" style={styles.bodyWrapper}>
            <Switch>
              <Route exact path="/" component={Homepage}/>
              <Route exact path="/movies" component={MoviePage}/>
              <Route path="/movies/add" component={AddMovie}/>
              <Route path="/movies/:id" component={DetailMovie}/>
              <Route path="/series" component={SeriesPage}/>
              <Route path="/favorites" component={FavoritePage}/>
            </Switch>
          </div>
        </div>
      </Router>
    </ApolloProvider>
    
  );
}

export default App;
