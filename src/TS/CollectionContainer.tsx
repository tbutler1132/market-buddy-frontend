import Collection from './Collection';
import { useSelector } from 'react-redux';

function CollectionContainer({ data, header }: {data: any, header: string}) {

    const { mode } = useSelector((state: any) => state.styles)

    const renderStocks = () => {
        return data.map((stock: any) => 
            <Collection key={stock.symbol} stock={stock} />
        )
    }

    return (
        <div data-mode={mode} className="sidebar-content">
            <h3>{header}</h3>
            <div data-mode={mode} className="card" style={{position: 'relative'}}>
                {renderStocks()}
            </div>
        </div>
    );
}

export default CollectionContainer;