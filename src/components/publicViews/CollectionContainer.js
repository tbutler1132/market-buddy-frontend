import React from 'react';
import Collection from './Collection';

function CollectionContainer(props) {
    return (
        <div className="sidebar-content">
            <div className="card" style={{position: 'relative'}}>
                <Collection />
            </div>
        </div>
    );
}

export default CollectionContainer;