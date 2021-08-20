import React, {useState} from 'react';
import axios from 'axios'
import {Autocomplete} from '@material-ui/lab'
import { TextField } from '@material-ui/core';
import {useHistory} from 'react-router-dom'
import {BASE_API} from './../App'


function SearchBar(props) {
    const [searchTerm, setSearchTerm] = useState('')
    const [suggestions, setSuggestions] = useState([])
    const history = useHistory()

    // // const dummy = [
    // //     {
    // //         title: "Hey"
    // //     },
    // //     {
    // //         title: "Never"
    // //     },
    // // ]


    const fetchResults = (event, values) => {
        setSearchTerm(event.target.value)
        if(searchTerm){
            axios(`${BASE_API}/stocks/search/${searchTerm}`)
            .then(results => {
                console.log(results.data)
                setSuggestions(results.data)
            })
        }
    }

    const submitHandler = (event, value) => {
        console.log("Clicked")
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


    // console.log(suggestions)

    // return (
    //     <div>
    //         <Autocomplete
    //             id="combo-box-demo"
    //             handleHomeEndKeys={false}
    //             onSubmit={(event) => submitHandler(event)}  
    //             options={suggestions}
    //             onChange={(event, value) => history.push(`/stocks/${value?.symbol.toLowerCase()}`)}
    //             getOptionSelected={(option, value) => option.symbol === value.symbol}
    //             getOptionLabel={(suggestion) => suggestion.symbol}
    //             onInputChange={fetchResults}
    //             style={{ width: 300 }}
    //             renderInput={(params) => <TextField  {...params} label="Search by stock symbol" variant="outlined" />}
    //         />
    //     </div>
    // );

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