import React from 'react';

import PortfolioList from './StockList';
import AddList from './AddList';

function StockListContainer(props) {
    const { user, portfolio} = props

    //Render watch lists
    const renderLists = () => {
        return user.lists.map(list => <PortfolioList list={true} title={list.title} user={user} stocks={list.stocks} key={list._id} />)
    }

    //Create an array of stock symbols in user's portfolio to send down as props
    const portfolioSymbols = () => {return user.portfolio.map(stock => stock.ticker)}

    return (
        <div className="sidebar-content">
            <div className="card" style={{position: 'relative'}}>
                <PortfolioList list={false} user={user} portfolio={portfolio} stocks={portfolioSymbols()}/>
                <h3>Lists</h3><AddList user={user}/>
                <hr></hr>
                {renderLists()}
            </div>
        </div>
    );
}

export default StockListContainer;