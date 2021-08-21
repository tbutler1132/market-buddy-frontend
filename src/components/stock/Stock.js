import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom'
import axios from 'axios'
import { BASE_API } from '../../App';
import LinearProgress from '@material-ui/core/LinearProgress';

import StockGraph from '../home/StockGraph'
import Transaction from './Transaction'
// import AddToLists from './AddToLists';


function Stock(props) {
    let { stockId } = useParams()

    const { user } = props

    //Consider refactor into Redux, though this is fairly specific to this component
    const [companyInfo, setCompanyInfo] = useState(false)
    const [latestPrice, setLatestPrice] = useState(false)
    const [historicalData, setHistoricalData] = useState(false)

    //Fetch company information from external API
    useEffect(() => {

        axios(`${BASE_API}/stocks/company/${stockId}`)
        .then(stock => setCompanyInfo(stock.data))

    }, [stockId])

    //Fetch up to date price from external API
    //<<<<------ FIND A DIFFERENT ENDPOINT -------->>>>//
    useEffect(() => {

        axios(`${BASE_API}/stocks/latestPrice/${stockId}`)
        .then(price => setLatestPrice(price.data))
    }, [stockId])


    //Fetch stock historical data
    useEffect(() => {
        axios.get(`${BASE_API}/stocks/historical/${stockId}`)
        .then(data => setHistoricalData(data.data))
    }, [stockId])

    //Prepare data to be sent down to graph
    const preparedStockData = () => {
        const data = []
        
        historicalData?.forEach(point => {
            const date = point['date'].slice(5, 10)
            const obj = {
                name: date,
                price: point['close']
            }
                data.push(obj)
        })
            return data
    }

    //Check what lists contain this stock
    const checkLists = () => {
        const presentLists = []
        const unPresentLists = []
        user.lists.forEach(list => {
            if (list.stocks.includes(stockId.toUpperCase())){
                presentLists.push(list)
            }else{
                unPresentLists.push(list)
            }
        })
        return {hasStock: presentLists, notHasStock: unPresentLists}
    }

    //Find the users position in the currently displayed stock
    //<<<<----- Would likely be faster to grab the stock table from redux and look up symbol: O(1) vs O(N)
    const userPosition = () => {
        return user.portfolio?.find(stock => stock.ticker === stockId.toUpperCase())
    }

    if (!companyInfo || !latestPrice || !historicalData) return <div className="loading-bar"><LinearProgress /></div>
    return (
        <div className="main-container">
            <div className="row">
                <div className="col-12">
                    <h1>{stockId}</h1>
                    <StockGraph type="price" data={preparedStockData()}/>
                    <h3>About</h3>
                    <p>{companyInfo.description}</p>
                </div>
                <div className="col-5">
                    <Transaction lists={checkLists()} userPosition={userPosition()} stockId={stockId} user={user} stockPrice={latestPrice}/>
                    {/* <AddToLists add={true} lists={checkLists().notHasStock} stockSymbol={stockId} user={user}/>
                    <AddToLists add={false} lists={checkLists().hasStock} stockSymbol={stockId} user={user}/> */}
                </div>
            </div>
        </div>
    );
}

export default Stock;