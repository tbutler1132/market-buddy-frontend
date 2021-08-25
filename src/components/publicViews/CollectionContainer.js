import { useEffect } from 'react';
import Collection from './Collection';
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux';

import { getCollection } from '../../redux/actions';

function CollectionContainer() {

    const dispatch = useDispatch()
    const collection = useSelector((state) => state.collection)


    useEffect(() => {
        axios.get(`http://localhost:7000/stocks/collection/list`)
        .then(data => {
            dispatch(getCollection(data.data))})
    }, [dispatch])

    const renderStocks = () => {
        return collection.map(stock => 
            <Collection key={stock.symbol} stock={stock} />
        )
    }



    if(!collection) return <div>Loading...</div>
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