import React from 'react';

import PortfolioList from './PortfolioList';
import WatchList from './WatchList';

function StockList(props) {
    return (
        <div className="stock-list">
            <PortfolioList />
            <hr></hr>
            <WatchList />
        </div>
    );
}

export default StockList;