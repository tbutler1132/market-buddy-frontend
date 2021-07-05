import React from 'react';
import {useSelector} from 'react-redux'

function PortfolioList(props) {

    const { stocks, title, user, list} = props
    const stockTest = useSelector((state) => state.stocks)

    console.log(stocks)

    const displayData = () => {
        const testArr = []
        stocks.forEach(stock => {
            if (stock in stockTest){
                testArr.push(stockTest[stock])
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

    // const test = () => {
    //     const table = Object.fromEntries(user.portfolio.map(stock => [stock.ticker, stock.shares]))
    //     const newData = [...displayData()]

    //     newData.forEach(stock => {
    //         if(stock['symbol'] in table){
    //             stock['shares'] = table[stock['symbol']]
    //         }
    //     })

    //     return newData
    // }

    // console.log(test())
    console.log(displayData())


    //Render user's portfolio info
    const renderStocks = () => {
        return displayData().map(stock => <h4 key={stock.symbol}>{`${stock.symbol}: ${stock.shares}, $${stock.uClose}`}</h4>)
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