import React from 'react';
import {useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import DeleteIcon from '@material-ui/icons/Delete';
import { useDispatch } from 'react-redux';

import {deleteList} from '../../redux/actions'

///TAKE A DEEPER DIVE INTO THIS

function PortfolioList(props) {

    const { stocks, title, user, list, listId} = props
    const dispatch = useDispatch()

    //Neato table from external stock api
    const stockTable = useSelector((state) => state.stocks)


    //Look into refactor, as of now it uses the stocks passed down as props to identify which stocks in our stock table the list needs to know about.
    //If the list is a portfolio list, it also adds a "shares" key
    const displayData = () => {
        const testArr = []
        stocks.forEach(stock => {
            if(stockTable){
                if (stock in stockTable){
                    testArr.push(stockTable[stock])
                }
            }
            else{
                //Create stocktable
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

    //Delete a list
    const removeList = () => {
        dispatch(deleteList(user._id, listId))
    }


    //Render stock info
    const renderStocks = () => {
        return displayData().map(stock => 
            <div key={stock.symbol} className="stock-list-stock-info">
                <Link style={{ textDecoration: 'none', color: 'black' }} to={`/stocks/${stock.symbol.toLowerCase()}`}>
                    <div className="symbol-shares-owned">
                        <h4 key={stock.symbol}>{stock.symbol}</h4> 
                        {!title ? <h5>{stock.shares} share{stock.shares === 1 ? '' : 's'}</h5> : null}
                    </div>
                    <div className="stock-list-stock-price">
                        <h4>${stock.latestPrice}</h4>
                    </div>
                </Link>
            </div>
        )
    }


    // if (!portfolioStocks || !stockMap) return <div>Loading..</div>
    return (
        <div className="stock-list">
            {title ? 
            <div className="list-title-container">
                <h3 style={{textDecoration: "underline"}}>{title}</h3> 
                <DeleteIcon style={{cursor: 'pointer'}} onClick={removeList} fontSize={'small'}/>
            </div>
            : <h2>Your Stocks</h2>}
            {renderStocks()}
        </div>
    );
}

export default PortfolioList;