import React from 'react';

import StockGraph from './StockGraph'
import StockList from './StockList';

function Home(props) {

    const { user } = props
    console.log(user)
    return (
        <div className="home">
            <StockGraph />
            <StockList user={user}/>
        </div>
    );
}

export default Home;