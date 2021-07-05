import React, {useState} from 'react';
import axios from 'axios'
import {Autocomplete} from '@material-ui/lab'
import { TextField } from '@material-ui/core';
import {useHistory} from 'react-router-dom'

function SearchBar(props) {
    const [searchTerm, setSearchTerm] = useState('')
    const [suggestions, setSuggestions] = useState([])
    const history = useHistory()

    // const dummy = [
    //     {
    //         title: "Hey"
    //     },
    //     {
    //         title: "Never"
    //     },
    // ]


    const fetchResults = (event, values) => {
        setSearchTerm(event.target.value)
        if(searchTerm){
            axios(`http://localhost:7000/stocks/search/${searchTerm}`)
            .then(results => setSuggestions(results.data))
        }
    }

    const submitHandler = (event, value) => {
        history.push(`/stocks/${event.target.value.toLowerCase()}`)
    }

    console.log(suggestions)

    return (
        <div>
            <Autocomplete
                id="combo-box-demo"
                handleHomeEndKeys={false}
                onSubmit={(event) => submitHandler(event)}  
                options={suggestions}
                onChange={(event, value) => history.push(`/stocks/${value.symbol.toLowerCase()}`)}
                getOptionSelected={(option, value) => option.symbol === value.symbol}
                getOptionLabel={(suggestion) => suggestion.symbol}
                onInputChange={fetchResults}
                style={{ width: 300 }}
                renderInput={(params) => <TextField  {...params} label="Search" variant="outlined" />}
            />
        </div>
    );
}

export default SearchBar;