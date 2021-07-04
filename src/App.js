import './App.css';
// import axios from 'axios'
import { useEffect} from 'react';
import { Switch, Route } from 'react-router-dom'
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getUser } from './redux/actions';

import Home from './components/home/Home'
import Nav from './components/Nav'
import StockContainer from './components/stock/StockContainer';

export const BASE_API = 'http://localhost:7000'

function App() {

  //USE CONTEXT FOR USER
  const dispatch = useDispatch() 
  // const [user, setUser] = useState(false)
  const user = useSelector((state) => state.user)


  // useEffect(() => {
  //   axios(`http://localhost:7000/users/60dfbc675aa6dc13e52fcf4b`)
  //   .then(user => setUser(user.data))
  // }, [])


  useEffect(() => {
    dispatch(getUser())
  }, [dispatch])


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
