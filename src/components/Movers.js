import { useState } from 'react';
import StockCard from './StockCard';
import { useGetDailyGainersQuery } from '../app/services/IEXCloud';

function Movers({type}) {

    const { data, isLoading } = useGetDailyGainersQuery(type)

    const renderStockCards = () => {
        const currentCollection = data.slice(0, 3)
        return currentCollection.map(stock => <StockCard type={type} key={stock.symbol} stock={stock}/>)
    }

    if(isLoading) return <div>Loading...</div>
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