import { useEffect, useState } from 'react';
import StockCard from './StockCard';
import axios from 'axios'
import { BASE_API } from '../App';

function Movers({type}) {

    const [collection, setCollection] = useState([])

    useEffect(() => {
        //Gainers endpoint
        axios(`${BASE_API}/stocks/collection/tag/list?name=${type}`)
        .then(data => setCollection(data.data))
    }, [type])

    const renderStockCards = () => {
        const currentCollection = collection.slice(0, 3)
        console.log("In render", currentCollection)
        return currentCollection.map(stock => <StockCard type={type} key={stock.symbol} stock={stock}/>)
    }

    if(!collection) return <div>Loading...</div>
    return (
        <div className="movers-container">
            <h1>Daily {type}</h1>
            <h5>Stocks making the biggest moves today</h5>
            <div className="stock-card-container">
                {renderStockCards()}
            </div>
        </div>
    );
}

export default Movers;