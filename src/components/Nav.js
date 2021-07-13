import React from 'react';
import { useHistory } from "react-router-dom"

import SearchBar from './SearchBar';


function Nav(props) {
    const history = useHistory()

    const clickHandler = () => {
        props.logoutHandler()
    }
    return (
        <div>
            <nav className="nav">
            <div className="home-button">
                <h1 id="list-add" onClick={() => history.push('/')}>Market Buddy</h1>
            </div>
            <div className="search">
                <SearchBar />
            </div>
            <div>
                <button onClick={clickHandler}>Logout</button>
            </div>
            </nav>
        </div>
    );
}

export default Nav;