import React from 'react';
import axios from 'axios'

import { BASE_API } from '../App'; 

function TrendingLists(props) {

    const clickHandler = (e) => {
        console.log(e.target.value)
        axios(`${BASE_API}/stocks/collection/tag/Biotechnology`)
        .then(data => console.log(data.data))
    }

    return (
        <div className="trending-lists">
            <h2>Trending Lists</h2> 
            <h4 style={{color: 'green'}}>Beta</h4>
            <button onClick={clickHandler} value="Biotechnology" className="collection-button">Biotechnology</button>
            <button className="collection-button">Transportation</button>
            <button className="collection-button">Broadcasting</button>
            <button onClick={clickHandler} value="Airlines" className="collection-button">Airlines</button>
            <button className="collection-button">Information</button>
            <button className="collection-button">Coal</button>
            <button className="collection-button">Steel</button>
            <button className="collection-button">Entertainment</button>
            <button className="collection-button">Transportation</button>
            <button className="collection-button">Fintech</button>
        </div>
    );
}

export default TrendingLists;