import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom'
import axios from 'axios'
import { BASE_API } from '../../App';

import StockGraph from '../home/StockGraph'
import Transaction from './Transaction'


function Stock(props) {
    let { stockId } = useParams()

    const { user } = props

    //Consider refactor into Redux, though this is fairly specific to this component
    const [companyInfo, setCompanyInfo] = useState(false)
    const [latestPrice, setLatestPrice] = useState(false)


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

    //Find the users position in the currently displayed stock
    //<<<<----- Would likely be faster to grab the stock table from redux and look up symbol: O(1) vs O(N)
    const userPosition = () => {
        return user.portfolio?.find(stock => stock.ticker === stockId.toUpperCase())
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