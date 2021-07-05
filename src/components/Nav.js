import React from 'react';
import { useHistory } from "react-router-dom"

import SearchBar from './SearchBar';
import AutoCompleteSearch from './AutoCompleteSearch';


function Nav(props) {
    const history = useHistory()
    return (
        <div className="nav">
            <h1 onClick={() => history.push('/')}>Home</h1>
            <SearchBar />
        </div>
    );
}

export default Nav;