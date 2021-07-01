import React from 'react';

import StockGraph from './StockGraph'
import StockList from './StockList';

function Home(props) {
    return (
        <div className="home">
            <StockGraph />
            <StockList />
        </div>
    );
}

export default Home;