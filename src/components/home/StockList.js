import React from 'react';
import {useSelector} from 'react-redux'

function PortfolioList(props) {

    const { stocks, title} = props
    const stockTest = useSelector((state) => state.stocks)

 
    const displayData = () => {
        const testArr = []
        stocks.forEach(stock => {
            if (stock in stockTest){
                testArr.push(stockTest[stock])
            }
        })
        return testArr
    }

    //Render user's portfolio info
    const renderStocks = () => {
        return displayData().map(stock => <h4 key={stock.symbol}>{`${stock.symbol}: $${stock.uClose}`}</h4>)
    }


    // if (!portfolioStocks || !stockMap) return <div>Loading..</div>
    return (
        <div>
            {title ? <h3>{title}</h3> : <h3>stocks</h3>}
            <hr></hr>
            {renderStocks()}
        </div>
    );
}

export default PortfolioList;