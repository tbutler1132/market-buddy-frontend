import { useHistory } from "react-router-dom"
import { Button } from '@material-ui/core'

import SearchBar from './SearchBar';


function Nav({ user, logoutHandler }) {
    const history = useHistory()

    const clickHandler = () => {
        logoutHandler()
    }

    const signupHandler = () => {
        history.push('/signup')
    }

    return (
        <div>
            <nav className="nav">
                <div className="home-button">
                    <h1 id="list-add" onClick={() => history.push('/home')}>Market Buddy</h1>
                </div>
                <div className="search">
                    <SearchBar />
                </div>
                <div className="logout-button">
                    {user ?
                    <Button onClick={clickHandler}>Logout</Button>
                    :
                    <Button onClick={signupHandler}>Sign up</Button>                   
                    }
                </div>
            </nav>
        </div>
    );
}

export default Nav;