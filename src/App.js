import './App.css';
import axios from 'axios'
import { useEffect, useState } from 'react';
// import { RecoilRoot } from 'recoil'

import Home from './components/home/Home'
import Nav from './components/Nav'
import React from 'react';

export const BASE_API = 'http://localhost:7000'

function App() {

  const [user, setUser] = useState(false)

  useEffect(() => {
    axios(`http://localhost:7000/users/60df7cc810b464fea7553a33`)
    .then(user => setUser(user.data))
  }, [])

  if (!user) return <div>Loading..</div>
  return (
    <div className="App">
        <Nav />
        <Home user={user}/>
    </div>
  );
}

export default App;
