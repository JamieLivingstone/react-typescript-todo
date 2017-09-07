import { CREATED_TODO, UPDATED_TODO, EDITING_TODO, COMPLETED_TODO, DELETED_TODO, LOADED_TODOS } from '../actions/todos';
import { ITodoItem } from '../../../shared_interfaces';

export default function authenticationReducer(state: ITodoItem[] = [], action: any): ITodoItem[] {
    switch (action.type) {
        case LOADED_TODOS:
            return state.concat(action.todos);

        case CREATED_TODO:
            return state.concat(action.todo);

        case DELETED_TODO:
            return state.filter(todo => todo._id !== action._id);

        case EDITING_TODO:
            return state.map(todo => todo._id === action._id ? {...todo, isUpdating: action.isEditing } : todo);

        case UPDATED_TODO:
            return state.map(todo => todo._id === action.todo._id ? { ...action.todo, isUpdating: false} : todo);

        case COMPLETED_TODO:
            return state.filter(todo => todo._id !== action._id);

        default:
            return state;
    }
}
