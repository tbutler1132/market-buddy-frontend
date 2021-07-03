import React from 'react';

import StockGraph from './StockGraph'
import StockListContainer from './StockListContainer';

function Home(props) {

    const { user } = props

    //Lift stock API calls here

    return (
        <div>
            <div className="main-page">
                <div className="graph-buying_power">
                    <h1>Portfolio Value</h1>
                    <StockGraph />
                    <h3>Buying power: ${user.cash}</h3>
                </div>
            </div>
            <div className="fixed-container">
                <StockListContainer user={user}/>
            </div>
        </div>
    );
}

export default Home;