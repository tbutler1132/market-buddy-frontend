import News from "../home/News";
import { getNews } from '../../redux/actions';
import StockGraph from "../home/StockGraph";
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios'
import React, {useEffect, useState} from 'react';
import CollectionContainer from "./CollectionContainer";
import TrendingLists from "../TrendingLists";

function PublicHome(props) {

    const dispatch = useDispatch()
    const news = useSelector((state) => state.news)
    const [NASDAQPrices, setNASDAQPrices] = useState(false)

    useEffect(() => {

    
    axios(`http://localhost:7000/stocks/historical/NDAQ`)
    .then(data => {
        console.log(data)
        setNASDAQPrices(data.data)})
    

    
    dispatch(getNews())
    }, [dispatch])

    console.log(news)

    const preparedStockData = () => {
        const data = []
        
        NASDAQPrices?.forEach(point => {
            const date = point['date'].slice(5, 10)
            const obj = {
                name: date,
                price: point['close']
            }
                data.push(obj)
        })
            return data
    }

    console.log(NASDAQPrices)

    // console.log(preparedStockData())

    if(!NASDAQPrices) return <div>Loading</div>
    return (
        <div className="main-container">
            <div className="row">
                <div className="col-12">
                    <h1>SandP</h1>
                    <h3>Latest Price here</h3>
                    <StockGraph type="price" data={preparedStockData()}/>
                    <TrendingLists />
                    <News news={news}/>
                </div>
                <div className="col-5">
                    <CollectionContainer />
                </div>
            </div>
        </div>
    );
}

export default PublicHome;