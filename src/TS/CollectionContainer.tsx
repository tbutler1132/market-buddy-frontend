import { CircularProgress } from '@material-ui/core';
import { useGetMostActiveStocksQuery } from '../app/services/IEXCloud'
import Collection from './Collection';

function CollectionContainer() {

    const { data, isLoading } = useGetMostActiveStocksQuery("_")

    const renderStocks = () => {
        return data.map((stock: any) => 
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