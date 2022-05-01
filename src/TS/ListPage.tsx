import {  
    Switch,
    Route,
    useRouteMatch,
    } 
from 'react-router-dom'
import List from './List';

function ListPage() {

    let match = useRouteMatch()

    return (
        <div>
            <Switch>
                <Route path={`${match.path}/:list`}>
                    <List type="sector"/>
                </Route>
                <Route path={match.path}>
                    <h3>Please select a topic.</h3>
                </Route>
            </Switch>
        </div>
    );
}

export default ListPage;