import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as authenticationActions from '../actions/authentication';
import todoActions from '../actions/todos';

class App extends React.Component<any, any> {
    render() {
        return (
            <div>
                {React.cloneElement(this.props.children, this.props)}
            </div>
        );
    }
}

function mapStateToProps(state: any) {
    return {
        authentication: state.authentication,
        todos: state.todos,
        projects: state.projects
    };
}

function mapDispatchToProps(dispatch: any) {
    return {
        actions: {
            authentication: bindActionCreators<any>(authenticationActions, dispatch),
            todos: bindActionCreators<any>(todoActions, dispatch),
            projects: bindActionCreators<any>(todoActions, dispatch)
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);