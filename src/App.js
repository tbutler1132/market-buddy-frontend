import './App.css';
import { useEffect, useState} from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { toggleDarkMode } from './app/stylesSlice';
import { ThemeProvider, createTheme } from '@mui/material/styles'

import DogCartoon from './assets/images/Dog_Cartoon.jpeg'

import StockPage from './TS/StockPage';


import Signup from './components/Signup'
import Signin from './components/Signin';

import PublicHome from './TS/PublicHome';
import Home from './TS/Home';

import Nav from './TS/Nav.tsx'

import ListPage from './TS/ListPage';

import DemoLogin from './TS/DemoLogin';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const lightTheme = createTheme({
  palette: {
    mode: 'light',
  },
});

function App() {
  const [signup, setSignup] = useState(true)
  
  const user = useSelector((state) => state.auth.user)
  const { mode } = useSelector((state) => state.styles)
  const dispatch = useDispatch()

  

  useEffect(() => {
    const preferredDesign = localStorage.getItem("mode")
    if(preferredDesign){
      dispatch(toggleDarkMode(preferredDesign))
    }
    document.body.style.backgroundColor = mode === "dark" ? "black" : "white"
  })
  
  const toggleHandler = (set) => {
    setSignup(set)
  }

  if (!user) 
    return (
      <ThemeProvider theme={mode === "dark" ? darkTheme : lightTheme}>
      <div data-mode={mode} className="App">
        <Nav />
        <Route to="/"><Redirect to="/home" /></Route>
        <Switch>
          <Route exact path="/home"><PublicHome /></Route>
          <Route path="/stocks" render={() => <StockPage design="stock" user={user}/>}/>
          <Route path="/crypto" render={() => <StockPage design="crypto" />}/>
          <Route path="/lists" render={() => <ListPage user={user}/>}/>
          <div className="signin-page">
            <Route exact path="/demo" render={() => <DemoLogin />}/> 
          {signup ?
            <div>
              <Route exact path="/signup" render={() => <Signup toggle={toggleHandler}/>}/>
            </div>
            :
            <div>
              <Route exact path="/signup" render={() => <Signin toggle={toggleHandler} />}/>
            </div>
          }
          <img src={DogCartoon} alt=""/>
          </div>
        </Switch>
      </div>
    </ThemeProvider>
    )
  return (
    <div className="App">
        <Nav />
      <Switch>
        <Route path="/home" render={() => <Home />}/>
        <Route path="/stocks" render={() => <StockPage design="stock" />}/>
      </Switch>
    </div>
  );
}

export default App;
