import axios from 'axios';
import constants from '../constants';

// API Endpoint
const API_URL = constants.api_url;

// Constants
import { ITodoItem } from '../../../shared_interfaces';
import { ITodoActions } from '../interfaces';

export const LOADING_TODOS = 'LOADING_TODOS';
export const LOADED_TODOS = 'LOADED_TODOS';
export const CREATING_TODO = 'CREATING_TODO';
export const CREATED_TODO = 'CREATED_TODO';
export const UPDATING_TODO = 'UPDATING_TODO';
export const UPDATED_TODO = 'UPDATED_TODO';
export const EDITING_TODO = 'EDITING_TODO';
export const COMPLETED_TODO = 'COMPLETED_TODO';
export const DELETED_TODO = 'DELETED_TODO';

// Loading todos
const loadingTodos = () => ({
    type: LOADING_TODOS
});

const loadedTodos = (todos: [ITodoItem]) => ({
    type: LOADED_TODOS,
    todos,
});

const loadTodos = () => {
    return (dispatch: Function): void => {
        dispatch(loadingTodos());

        axios.get(`${API_URL}/todos`)
            .then(res => {
                if (res.data && res.data.todos && Array.isArray(res.data.todos)) {
                    dispatch(loadedTodos(res.data.todos));
                }
            });
    };
};

// Creating todos
const creatingTodo = (todo: ITodoItem) => ({
    type: CREATING_TODO,
    todo
});

const createdTodo = (todo: ITodoItem) => ({
    type: CREATED_TODO,
    todo
});

const createTodo = (todo: ITodoItem) => {
    return (dispatch: Function): void => {
        dispatch(creatingTodo(todo));

        axios.post(`${API_URL}/todos/create`, {todo})
            .then(res => {
                if (res.data.todo) {
                    return dispatch(createdTodo(res.data.todo));
                }
            });
    };
};

// Update existing todos
const updatingTodo = (todo: ITodoItem) => ({
    type: UPDATING_TODO,
    todo
});

const updatedTodo = (todo: ITodoItem) => ({
    type: UPDATED_TODO,
    todo
});

const updateTodo = (todo: ITodoItem) => {
    return (dispatch: Function): void => {
        dispatch(updatingTodo(todo));

        axios.post(`${API_URL}/todos/update`, { todo })
            .then(res => {
                if (res.data.updated && res.data.todo) {
                    return dispatch(updatedTodo(res.data.todo));
                }
            });
    };
};

// Delete todos
const deletedTodo = (_id: string | number) => ({
    type: DELETED_TODO,
    _id
});

const deleteTodo = (_id: string | number) => {
    return (dispatch: Function): void => {
        axios.post(`${API_URL}/todos/delete`, {_id})
            .then(res => {
                if (res.data.hasOwnProperty('deleted') && res.data.deleted === true) {
                    dispatch(deletedTodo(_id));
                }
            });
    };
};

// Complete todos
const completedTodo = (_id: string | number) => ({
    type: COMPLETED_TODO,
    _id
});

const completeTodo = (_id: string | number) => {
    return (dispatch: Function) => {
        axios.post(`${API_URL}/todos/complete`, { _id })
            .then(res => {
                if (res.data.hasOwnProperty('completed') && res.data.completed === true) {
                    dispatch(completedTodo(_id));
                }
            });
    };
};

// Edit todos
const editingTodo = (_id: string | number, isEditing: boolean = true) => ({
    type: EDITING_TODO,
    _id,
    isEditing,
});

// Export actions
const todoActions: ITodoActions = {
    loadTodos,
    createTodo,
    updateTodo,
    deleteTodo,
    editingTodo,
    completeTodo,
};

export default todoActions;