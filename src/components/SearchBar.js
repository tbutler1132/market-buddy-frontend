import React, {useState, useRef} from 'react';
import axios from 'axios'
import {useHistory} from 'react-router-dom'
import {BASE_API} from './../App'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

function SearchBar() {
    const [searchTerm, setSearchTerm] = useState('')
    const [suggestions, setSuggestions] = useState([])
    const history = useHistory()
    
    const fetchResults = (event, values) => {
        setSearchTerm(event.target.value)
        if(searchTerm){
            axios(`http://localhost:7000/stocks/search/${searchTerm}`)
            .then(results => {
                setSuggestions(results.data)
            })
        }
    }

    const submitHandler = (event, value) => {
        if(event.target.innerText){
            history.push(`/stocks/${event.target.innerText.toLowerCase()}`)
        }
        setSuggestions([])    }



    return (
            <div className="search-input">  
                <Autocomplete 
                clearOnEscape
                freeSolo
                filterOptions={(x) => x} 
                options={suggestions.map((option) => option.symbol)}
                onChange={submitHandler}
                renderInput={(params) => <TextField color="success" variant='outlined' onChange={fetchResults} {...params} label="Search Stocks"/>}
                />
            </div> 
    );
}

export default SearchBar;