import Collection from './Collection';

function CollectionContainer({ data, header }: {data: any, header: string}) {


    const renderStocks = () => {
        return data.map((stock: any) => 
            <Collection key={stock.symbol} stock={stock} />
        )
    }

    return (
        <div className="sidebar-content">
            <h3>{header}</h3>
            <div className="card" style={{position: 'relative'}}>
                {renderStocks()}
            </div>
        </div>
    );
}

export default CollectionContainer;