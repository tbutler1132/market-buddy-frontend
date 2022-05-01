import { useState } from 'react';
import axios from 'axios'
import {useHistory} from 'react-router-dom'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useSelector } from 'react-redux';

const BASE_API = process.env.NODE_ENV === "development" ? 'http://localhost:7000/' : 'https://market-buddy-server.herokuapp.com/'

function SearchBar() {
    const [searchTerm, setSearchTerm] = useState('')
    const [suggestions, setSuggestions] = useState([])
    const history = useHistory()
    const { mode } = useSelector((state) => state.styles)
    
    const fetchResults = (event, values) => {
        setSearchTerm(event.target.value)
        if(searchTerm){
            axios(`${BASE_API}stocks/search/${searchTerm}`)
            .then(results => {
                setSuggestions(results.data)
            })
        }
    }

    const submitHandler = (event, value) => {
        if(event.target.innerText){
            history.push(`/stocks/${event.target.innerText.toLowerCase()}`)
        }
        setSuggestions([])   
    }



    return (
        <div className="search-input">  
            <Autocomplete 
            clearOnEscape
            freeSolo
            filterOptions={(x) => x} 
            options={suggestions.map((option) => option.symbol)}
            onChange={submitHandler}
            renderInput={(params) => <TextField  color="success" focused variant='outlined' onChange={fetchResults} {...params} label="Search Stocks"/>}
            />
        </div> 
    )
}

export default SearchBar;