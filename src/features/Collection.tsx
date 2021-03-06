import { Link } from 'react-router-dom';
import MiniStockChart from './MiniStockChart';
import { useSelector } from 'react-redux';

function Collection({ stock }: {stock: any}) {

    const { mode } = useSelector((state: any) => state.styles)
    
    return (
        <div data-mode={mode} className="stock-list">
            <div key={stock.symbol} className="stock-list-stock-info">
                <Link style={{ textDecoration: 'none', color: mode === "dark" ? 'white' : 'black', justifyContent: "space-between" }} to={`/stocks/${stock.symbol.toLowerCase()}`}>
                    <div className="symbol-shares-owned">
                        <h4 key={stock.symbol}>{stock.symbol}</h4> 
                        <span>{'sharesOwned' in stock ? stock.sharesOwned + ' Share(s)' : null}</span>
                    </div>
                    <MiniStockChart stockId={stock.symbol}/>
                    <div className="stock-list-stock-price">
                        <h4>${stock.latestPrice.toFixed(2)}</h4>
                        <h4 style={{color: stock.change > 0 ? 'green' : 'red'}}>{stock.change ? stock.change : (stock.changePercent * 100).toFixed(2)}%</h4>
                    </div>
                </Link>
            </div>
        </div>
    );
}

export default Collection;