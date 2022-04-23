import Collection from './Collection';
import { CircularProgress } from '@material-ui/core';
import { useGetMostActiveStocksQuery } from '../../app/services/IEXCloud';

function CollectionContainer() {

    const { data, isLoading } = useGetMostActiveStocksQuery()

    const renderStocks = () => {
        return data.map(stock => 
            <Collection key={stock.symbol} stock={stock} />
        )
    }

    if(isLoading) return <div><CircularProgress /></div>
    return (
        <div className="sidebar-content">
            <h3>Most Active Stocks</h3>
            <div className="card" style={{position: 'relative'}}>
                {renderStocks()}
            </div>
        </div>
    );
}

export default CollectionContainer;