import {  
    Switch,
    Route,
    useRouteMatch,
    } 
from 'react-router-dom'

import Stock from './Stock'

interface stockPageProps {
    design: string
}

function StockPage({ design }: stockPageProps) {

    let match = useRouteMatch()

    return (
        <div>
            <Switch>
                <Route path={`${match.path}/:stockId`}>
                    <Stock />
                </Route>
                <Route path={match.path}>
                    <h3>Please select a topic.</h3>
                </Route>
            </Switch>
        </div>
    );
}

export default StockPage;