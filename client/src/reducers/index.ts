import { combineReducers } from 'redux';
import authentication from './authentication';
import todos from './todos';

export default combineReducers({
    authentication,
    todos,
});
