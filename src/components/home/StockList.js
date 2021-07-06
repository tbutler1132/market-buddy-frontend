import React from 'react';
import {useSelector} from 'react-redux'

function PortfolioList(props) {

    const { stocks, title, user, list} = props

    //Neato table from external stock api
    const stockTable = useSelector((state) => state.stocks)


    //Look into refactor, as of now it uses the stocks passed down as props to identify which stocks in our stocktable the list needs to know about.
    //If the list is a portfolio list, it also adds a "shares" key
    const displayData = () => {
        const testArr = []
        stocks.forEach(stock => {
            if (stock in stockTable){
                testArr.push(stockTable[stock])
            }
        })
        if (!list){
            const table = Object.fromEntries(user.portfolio.map(stock => [stock.ticker, stock.shares]))
            testArr.forEach(stock => {
                if(stock['symbol'] in table){
                    stock['shares'] = table[stock['symbol']]
                }
            })
        }

        return testArr
    }


    //Render stock info
    const renderStocks = () => {
        return displayData().map(stock => <h4 key={stock.symbol}>{`${stock.symbol}: ${stock.shares}, $${stock.uClose}`}</h4>)
    }


    // if (!portfolioStocks || !stockMap) return <div>Loading..</div>
    return (
        <div>
            {title ? <h3>{title}</h3> : <h3>stocks</h3>}
            <hr></hr>
            {renderStocks()}
            <hr></hr>
        </div>
    );
}

export default PortfolioList;