function TrendingLists() {

    return (
        <div className="trending-lists">
            <h2>Trending Lists</h2> 
            <h4 style={{color: 'green'}}>Beta</h4>
            <button value="Biotechnology" className="collection-button">Biotechnology</button>
            <button className="collection-button">Transportation</button>
            <button className="collection-button">Broadcasting</button>
            <button value="Airlines" className="collection-button">Airlines</button>
            <button className="collection-button">Information</button>
            <button className="collection-button">Coal</button>
            <button className="collection-button">Steel</button>
            <button className="collection-button">List name</button>
            <button className="collection-button">List name</button>
            <button className="collection-button">List name</button>
        </div>
    );
}

export default TrendingLists;