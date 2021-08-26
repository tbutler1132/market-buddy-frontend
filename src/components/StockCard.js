import React from 'react';

function StockCard({stock}) {
    return (
        <div className="stock-card">
            <h1>{stock.symbol}</h1>
            <h2>${stock.latestPrice}</h2>
            <h2 style={{ color: 'green' }}>+{stock.change}%</h2>
        </div>
    );
}

export default StockCard;