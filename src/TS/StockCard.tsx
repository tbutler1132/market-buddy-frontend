import { Link } from 'react-router-dom';

interface StockCardProps {
    stock: any 
    type: string
    mode: string
}

function StockCard({stock, type, mode }: StockCardProps) {


    return (
        <div data-mode={mode} className="stock-card">
            <Link style={{ textDecoration: 'none', color: mode === 'dark' ? 'white' : 'black' }} to={`/stocks/${stock.symbol.toLowerCase()}`} >
                <h1>{stock.symbol}</h1>
            </Link>
                <h2>${stock.latestPrice.toFixed(2)}</h2>
                <h2 style={{ color: type === "Gainers" ? 'green' : 'red' }}>{stock.change}%</h2>
        </div>
    );
}

export default StockCard;