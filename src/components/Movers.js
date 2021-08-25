import { useEffect } from 'react';
import StockCard from './StockCard';

function Movers({type}) {

    useEffect(() => {
        //Gainers endpoint
    })

    return (
        <div className="gainers">
            <h1>Daily {type}</h1>
            <h5>Stocks making the biggest moves today</h5>
        </div>
    );
}

export default Movers;