import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom'
import axios from 'axios'
import { BASE_API } from '../../App';

import StockGraph from '../home/StockGraph'
import Transaction from './Transaction'


function Stock(props) {
    let { stockId } = useParams()

    const { user } = props

    const [companyInfo, setCompanyInfo] = useState(false)
    const [latestPrice, setLatestPrice] = useState(false)

    useEffect(() => {

        axios(`${BASE_API}/stocks/company/${stockId}`)
        .then(stock => setCompanyInfo(stock.data))

    }, [stockId])

    useEffect(() => {

        axios(`${BASE_API}/stocks/latestPrice/${stockId}`)
        .then(price => setLatestPrice(price.data))
    }, [stockId])

    const userPosition = () => {
        return user.portfolio.find(stock => stock.ticker === stockId.toUpperCase())
    }

    if (!companyInfo || !latestPrice) return <div>Loading..</div>
    return (
        <div className="main-page">
            <div className="graph-buying_power">
                <h1>{stockId}</h1>
                <StockGraph />
                <h3>About</h3>
                <p>{companyInfo.description}</p>
            </div>
            <div className="fixed-container">
                <Transaction userPosition={userPosition()} stockId={stockId} user={user} stockPrice={latestPrice}/>
                <h3>Add to lists</h3>
            </div>
        </div>
    );
}

export default Stock;