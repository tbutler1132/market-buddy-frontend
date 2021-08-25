import { useEffect, useState } from 'react';
import Collection from './Collection';
import axios from 'axios'

function CollectionContainer() {
    const [collection, setCollection] = useState([])


    useEffect(() => {
        axios.get(`http://localhost:7000/stocks/collection/list`)
        .then(data => {
            console.log(data.data)
            setCollection(data.data)})
    }, [])

    const renderStocks = () => {
        return collection.map(stock => 
            <Collection key={stock.symbol} stock={stock} />
        )
    }



    if(!collection) return <div>Loading...</div>
    return (
        <div className="sidebar-content">
            <h3>List Name</h3>
            <div className="card" style={{position: 'relative'}}>
                {renderStocks()}
            </div>
        </div>
    );
}

export default CollectionContainer;