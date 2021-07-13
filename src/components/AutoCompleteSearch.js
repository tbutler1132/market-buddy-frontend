import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios'

const BASE_API = ''

const AutoCompleteSearch = () => {
    const [display, setDisplay] = useState(false);
    const [options, setOptions] = useState([]);
    const [search, setSearch] = useState("");
    const wrapperRef = useRef(null);

  
    useEffect(() => {
      window.addEventListener("mousedown", handleClickOutside);
      return () => {
        window.removeEventListener("mousedown", handleClickOutside);
      };
    });
  
    const handleClickOutside = event => {
      const { current: wrap } = wrapperRef;
      if (wrap && !wrap.contains(event.target)) {
        setDisplay(false);
      }
    };
  
    const updatePokeDex = (poke) => {
      setSearch(poke);
      setDisplay(false);
    };


    const changeHandler = (e) => {

        setSearch(e.target.value)
        if(search){
            axios(`http://localhost:7000/stocks/search/${search}`)
            .then(results => {
                setOptions(results.data)
            })
        }
    }

    return (
      <div ref={wrapperRef} className="flex-container flex-column pos-rel">
        <input
          id="auto"
          onClick={() => setDisplay(!display)}
          placeholder="Type to search"
          value={search}
          onChange={changeHandler}
        />
        {display && (
          <div className="autoContainer">
            {options
              .filter(({ symbol }) => symbol.indexOf(search.toLowerCase()) > -1)
              .map((value, i) => {
                return (
                  <div
                    onClick={() => updatePokeDex(value.symbol)}
                    className="option"
                    key={i}
                    tabIndex="0"
                  >
                    <span>{value.symbol}</span>
                  </div>
                );
              })}
          </div>
        )}
      </div>
    );
  };

export default AutoCompleteSearch;