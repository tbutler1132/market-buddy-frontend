import './App.css';
import { useState} from 'react';
import { Switch, Route, Redirect, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios'
// import CircularProgress  from '@material-ui/core/CircularProgress';
import DogCartoon from './assets/images/Dog_Cartoon.jpeg'

// import { getUser } from './redux/actions';

// import StockContainer from './components/stock/StockContainer';
import StockPage from './TS/StockPage';


import Signup from './components/Signup'
import Signin from './components/Signin';

// import PublicHome from './components/publicViews/PublicHome';
import PublicHome from './TS/PublicHome';

// import Nav from './components/Nav'
import Nav from './TS/Nav.tsx'

// import Home from './components/home/Home'
// import Home from './TS/Home'

import ListPage from './TS/ListPage';



export const BASE_API = 'http://localhost:7000'


function App() {
  const [signup, setSignup] = useState(true)
  const history = useHistory()
  
  const dispatch = useDispatch() 
  const user = useSelector((state) => state.auth.user)
  
  //Initial fetch user from API upon app mounting
  // useEffect(() => {
  //   const token = localStorage.getItem("token")
  //   const profile = localStorage.getItem("profile")

  //   if(token) {
  //     console.log()
  //     const profileObj = JSON.parse(profile)
    

  //     axios({
  //       method: 'GET',
  //       url: `${BASE_API}/users/${profileObj._id}`,
  //       headers: {
  //         'Authorization': `Bearer ${token}`,
  //         'Content-Type': 'application/json',
  //         'Accept': 'application/json'
  //       }
  //     })
  //     .then(userObj => {
  //       dispatch(getUser(userObj.data))
  //     })
  //   }
  // }, [dispatch])

  // const signupHandler = (userInfo) => {
  //   dispatch(getUser("loading"))
  //   axios({
  //     url: `${BASE_API}/users/signup`,
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'Accept': 'application/json'
  //     },
  //     data: userInfo
  //   })

  //   .then(data => {
  //     localStorage.setItem("token", data.data.token)
  //     localStorage.setItem("profile", JSON.stringify({...data.data.result}))
  //     dispatch(getUser(data.data.result))
  //     history.push('/home')
  //   })
  //   .catch((error) => {
  //     alert("Username already in use")
  //     dispatch(getUser(false))
  //   })
  // }

  // const signinHandler = (userInfo) => {
  //   axios({
  //     url: `${BASE_API}/users/signin`,
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'Accept': 'application/json'
  //     },
  //     data: userInfo
  //   })

  //   .then(data => {
  //     localStorage.setItem("token", data.data.token)
  //     localStorage.setItem("profile", JSON.stringify({...data.data.result}))
  //     dispatch(getUser(data.data.result))
  //     history.push('/home')
  //   })
  // }

  const logoutHandler = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("profile")
    history.push('/signup')
  }

  const toggleHandler = (set) => {
    setSignup(set)
  }

  //Don't render until the user has been retrieved. Once we have the user, render two routes- home page and stock show page
  if (!user) 
    return (
    <>
    <div className="App">
        <Nav />
        <Route to="/"><Redirect to="/home" /></Route>
      <Switch>
        <Route exact path="/home"><PublicHome /></Route>
        <Route path="/stocks" render={() => <StockPage user={user}/>}/>
        <Route path="/lists" render={() => <ListPage user={user}/>}/>
        <div className="signin-page">
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
    </>
    )

  // if (user === "loading"){
  //   return(
  //     <div>
  //       <CircularProgress />
  //       <p>Signing in...</p>
  //     </div>
  //   )
  // }
  // return (
  //   <div className="App">
  //       <Nav user={user} logoutHandler={logoutHandler}/>
  //     <Switch>
  //       <Route path="/home" render={() => <Home user={user}/>}/>
  //       <Route path="/stocks" render={() => <StockContainer user={user}/>}/>
  //     </Switch>
  //   </div>
  // );
}

export default App;
