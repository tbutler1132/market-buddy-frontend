import React, {useState, useRef} from 'react';
import axios from 'axios'
import {useHistory} from 'react-router-dom'
import {BASE_API} from './../App'
import useOutsideAlerter from '../hooks/useOutsideAlerter';
import { TextField } from '@material-ui/core';

function SearchBar() {
    const [searchTerm, setSearchTerm] = useState('')
    const [suggestions, setSuggestions] = useState([])
    const history = useHistory()
    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef);

    const fetchResults = (event, values) => {
        setSearchTerm(event.target.value)
        if(searchTerm){
            axios(`${BASE_API}/stocks/search/${searchTerm}`)
            .then(results => {
                setSuggestions(results.data)
            })
        }
    }

    const submitHandler = (event, value) => {
        history.push(`/stocks/${event.target.innerText.toLowerCase()}`)
        setSuggestions([])
    }

    const renderSuggestions = () => {
        if(searchTerm){
            return suggestions.map(stock => 
                <li onClick={submitHandler} value={stock.symbol} key={stock.symbol}>{stock.symbol}</li>
            )
        }else{
            return null
        }
    }


    return (
        <div ref={wrapperRef} className="wrapper">
            <div className="search-input">  
                <TextField variant='outlined' onChange={fetchResults}/>
                {searchTerm 
                    ?
                        <div className="autocom-box">
                            {renderSuggestions()}
                        </div>
                    :
                        null
                }
            </div> 
        </div>
    );
}

export default SearchBar;