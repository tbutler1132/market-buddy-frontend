import React from 'react';

// import PortfolioList from './PortfolioList';
// import AddList from './AddList';

//Renders watchlists, as well as user portfolio

function StockListContainer() {
    // const { user, portfolio} = props

    //Render watch lists
    // const renderLists = () => {
    //     return user.lists.map(list => <PortfolioList list={true} title={list.title} user={user} stocks={list.stocks} key={list._id} listId={list._id}/>)
    // }

    //Create an array of stock symbols in user's portfolio to send down as props
    // const portfolioSymbols = () => {return user.portfolio.map((stock: any) => stock.ticker)}


    return (
        <div className="sidebar-content">
            <div className="card" style={{position: 'relative'}}>
                {/* <PortfolioList list={false} user={user} portfolio={portfolio} stocks={portfolioSymbols()}/> */}
                <div className="stock-list-title">
                    <h2>Your Lists</h2>
                    {/* <AddList user={user}/> */}
                </div>
                {/* {renderLists()} */}
            </div>
        </div>
    );
}

export default StockListContainer;