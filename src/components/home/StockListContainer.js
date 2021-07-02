import React from 'react';

import PortfolioList from './StockList';

function StockList(props) {
    const { user } = props

    //Render watch lists
    const renderLists = () => {
        return user.lists.map(list => <PortfolioList title={list.title} user={user} stocks={list.stocks} key={list._id} />)
    }

    return (
        <div className="stock-list">
            <PortfolioList user={user} stocks={user.portfolio}/>
            <hr></hr>
            {renderLists()}
        </div>
    );
}

export default StockList;