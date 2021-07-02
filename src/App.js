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
    axios(`http://localhost:7000/users/60de6a8b5a53799d58cbb91f`)
    .then(user => setUser(user.data))
  }, [])

  return (
    <div className="App">
        <Nav />
        <Home user={user}/>
    </div>
  );
}

export default App;
