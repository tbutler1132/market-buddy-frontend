import Collection from './Collection';
import { useSelector } from 'react-redux';

interface CollectionContainerProps {
    header: string,
    data: {}[]
}

function CollectionContainer({ data, header }: CollectionContainerProps) {
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