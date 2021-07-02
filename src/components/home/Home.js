import React from 'react';

import StockGraph from './StockGraph'
import StockList from './StockListContainer';

function Home(props) {

    const { user } = props

    //Lift stock API calls here

    return (
        <div className="home">
            <div className="buying_power-graph">
                <h1>Portfolio Value</h1>
                <StockGraph />
                <h3>Buying power: ${user.cash}</h3>
            </div>
            <StockList user={user}/>
        </div>
    );
}

export default Home;