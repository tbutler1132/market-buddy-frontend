import React from 'react';
import {  Switch,
    Route,
    useRouteMatch,
    } 
from 'react-router-dom'

import Stock from './Stock'

function StockContainer(props) {
    const { user } = props
    let match = useRouteMatch()

    return (
        <div>
            <Switch>
                <Route path={`${match.path}/:stockId`}>
                    <Stock user={user}/>
                </Route>
                <Route path={match.path}>
                    <h3>Please select a topic.</h3>
                </Route>
            </Switch>
        </div>
    );
}

export default StockContainer;