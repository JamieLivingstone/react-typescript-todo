import * as React from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';

// Store container
import App from './containers/App';

// Components
import Authentication from './components/authentication/View';
import Todos from './components/todos/View';

// Browser history
export const history = browserHistory;

// Render routes and wrap with store to allow child components to call actions
export default (): JSX.Element => (
    <Router history={history}>
        <Route path="/" component={App}>}
            <IndexRoute component={Authentication} />
            <Route path="/app" component={Todos}  />
        </Route>
    </Router>
);