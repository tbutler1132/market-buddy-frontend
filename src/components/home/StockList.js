import React from 'react';

import PortfolioList from './PortfolioList';
import WatchList from './WatchList';

function StockList(props) {
    const { user } = props

    return (
        <div className="stock-list">
            <PortfolioList user={user}/>
            <hr></hr>
            <WatchList />
        </div>
    );
}

export default StockList;