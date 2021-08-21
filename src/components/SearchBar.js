import React, {useState} from 'react';
import axios from 'axios'
import {useHistory} from 'react-router-dom'
import {BASE_API} from './../App'


function SearchBar() {
    const [searchTerm, setSearchTerm] = useState('')
    const [suggestions, setSuggestions] = useState([])
    const history = useHistory()


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
        <div className="wrapper">
            <div className="search-input">  
                <input onChange={fetchResults}/>
                <div className="autocom-box">
                    {renderSuggestions()}
                </div>
            </div> 
        </div>
    );
}

export default SearchBar;