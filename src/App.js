import './App.css';
import { useEffect} from 'react';
import { Switch, Route } from 'react-router-dom'
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios'

import { getUser } from './redux/actions';

import Home from './components/home/Home'
import Nav from './components/Nav'
import StockContainer from './components/stock/StockContainer';

export const BASE_API = 'http://localhost:7000'


function App() {
  
  //REDUX:  Create dispatch to update user state, useSelector to retrieve user from the store
  //NOTE:   I passed the user down manually via props because many components will need it, so there will be no excessive "prop" drilling
  //      This is slightly easier than getting it from the store everytime.
  const dispatch = useDispatch() 
  const user = useSelector((state) => state.user)
  
  //Initial fetch user from API upon app mounting
  useEffect(() => {
    axios(`${BASE_API}/users/60dfbc675aa6dc13e52fcf4b`)
    .then(userObj => {
      dispatch(getUser(userObj))
    })
  }, [dispatch])


  //Don't render until the user has been retrieved. Once we have the user, render two routes- home page and stock show page
  if (!user) return <div>Loading..</div>
  return (
    <div className="App">
        <Nav />
      <Switch>
        <Route exact path="/" render={() => <Home user={user}/>}/>
        <Route path="/stocks" render={() => <StockContainer user={user}/>}/>
      </Switch>
    </div>
  );
}

export default App;
