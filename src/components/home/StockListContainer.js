import React from 'react';

import PortfolioList from './StockList';

function StockListContainer(props) {
    const { user } = props

    //Render watch lists
    const renderLists = () => {
        return user.lists.map(list => <PortfolioList title={list.title} user={user} stocks={list.stocks} key={list._id} />)
    }

    const portfolioSymbols = () => {return user.portfolio.map(stock => stock.ticker)}

    return (
        <div className="stock-list">
            <PortfolioList user={user} stocks={portfolioSymbols()}/>
            <hr></hr>
            {renderLists()}
        </div>
    );
}

export default StockListContainer;