import React from 'react';
import { useHistory } from "react-router-dom"

import SearchBar from './SearchBar';


function Nav(props) {
    const history = useHistory()
    return (
        <div>
            <nav className="nav">
            <div className="home-button">
                <h1 onClick={() => history.push('/')}>Home</h1>
            </div>
            <div className="search">
                <SearchBar />
            </div>
            </nav>
        </div>
    );
}

export default Nav;