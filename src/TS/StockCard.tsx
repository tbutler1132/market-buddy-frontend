import { Link } from 'react-router-dom';

interface StockCardProps {
    stock: any 
    type: string
}

function StockCard({stock, type}: StockCardProps) {


    return (
        <div className="stock-card">
            <Link style={{ textDecoration: 'none', color: 'black' }} to={`/stocks/${stock.symbol.toLowerCase()}`} >
                <h1>{stock.symbol}</h1>
            </Link>
                <h2>${stock.latestPrice.toFixed(2)}</h2>
                <h2 style={{ color: type === "Gainers" ? 'green' : 'red' }}>{stock.change}%</h2>
        </div>
    );
}

export default StockCard;