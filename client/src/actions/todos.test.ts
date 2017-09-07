import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import todos from './todos';
import { ITodoItem } from '../../../shared_interfaces';

// Create a mock store
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

// Action names
import {
    LOADING_TODOS,
    LOADED_TODOS,
    CREATING_TODO,
    CREATED_TODO,
    UPDATING_TODO,
    UPDATED_TODO,
    EDITING_TODO,
    COMPLETED_TODO,
    DELETED_TODO
} from './todos';

// Mock store fields
const todoStore: ITodoItem[] = [];

// Mock todos
const mockTodos: ITodoItem[] = [
    {
        _id: 1,
        userId: '34343',
        title: 'Walk the dog',
        completed: false,
        date: 34343,
        isUpdating: false
    },
    {
        _id: 2,
        userId: '34343',
        title: 'Water the plants',
        completed: false,
        date: 34343,
        isUpdating: false
    },
    {
        _id: 3,
        userId: '0',
        title: 'Do shopping',
        completed: false,
        date: 34343,
        isUpdating: false
    }
];

// test todos actions
describe('todos actions', () => {
    it('should load todos and create an action', async () => {
        const store = mockStore(todoStore.slice(0));

        // Override axios to 'load' todos
        axios.get = jest.fn(() => {
            return Promise.resolve({ data: {
                todos: mockTodos.slice(0)
            }});
        });

        await store.dispatch(todos.loadTodos());

        // Expect these actions to be dispatched
        const expectedActions = [
            { type: LOADING_TODOS },
            { type: LOADED_TODOS, todos: mockTodos },
        ];

        expect(store.getActions()).toEqual(expectedActions);
    });

    it('should create an action for a new todo', async () => {
        const store = mockStore(mockTodos.slice(0));

        const newTodo: ITodoItem = {
            _id: 3343,
            userId: '434343',
            title: 'Play xbox',
            completed: false,
            date: 343443,
            isUpdating: false
        };

        // Override axios post
        axios.post = jest.fn(() => {
            return Promise.resolve({ data: {
                todo: newTodo
            }});
        });

        await store.dispatch(todos.createTodo(newTodo));

        // Expect these actions to be dispatched
        const expectedActions = [
            { type: CREATING_TODO, todo: newTodo },
            { type: CREATED_TODO, todo: newTodo },
        ];

        expect(store.getActions()).toEqual(expectedActions);
    });

    it('should create an action to update todos', async () => {
        const store = mockStore(mockTodos.slice(0));

        const todoToUpdate = mockTodos.slice(0)[0];
        const updatedTodo = Object.assign({}, todoToUpdate, { title: 'I am updated' });

        // Override axios post
        axios.post = jest.fn(() => {
            return Promise.resolve({ data: {
                updated: true,
                todo: updatedTodo
            }});
        });

        await store.dispatch(todos.updateTodo(todoToUpdate));

        // Expect these actions to be dispatched
        const expectedActions = [
            { type: UPDATING_TODO, todo: todoToUpdate },
            { type: UPDATED_TODO, todo: updatedTodo },
        ];

        expect(store.getActions()).toEqual(expectedActions);
    });

    it('should create an action to update todos', () => {
        const store = mockStore(mockTodos.slice(0));
        const todo = mockTodos.slice(0)[0];

        store.dispatch(todos.editingTodo(todo._id, true));
        store.dispatch(todos.editingTodo(todo._id, false));

        // Expect these actions to be dispatched
        const expectedActions = [
            { type: EDITING_TODO, _id: 1, isEditing: true },
            { type: EDITING_TODO, _id: 1, isEditing: false }
        ];

        expect(store.getActions()).toEqual(expectedActions);
    });

    it('should create an action to complete todos', async () => {
        const store = mockStore(mockTodos.slice(0));
        const todo = mockTodos.slice(0)[1];

        // Override axios post
        axios.post = jest.fn(() => {
            return Promise.resolve({ data: {
                completed: true
            }});
        });

        await store.dispatch(todos.completeTodo(todo._id));

        // Expect these actions to be dispatched
        const expectedActions = [
            { type: COMPLETED_TODO, _id: todo._id }
        ];

        expect(store.getActions()).toEqual(expectedActions);
    });

    it('should create an action to delete todos', async () => {
        const store = mockStore(mockTodos.slice(0));
        const todo = mockTodos.slice(0)[2];

        // Override axios post
        axios.post = jest.fn(() => {
            return Promise.resolve({ data: {
                deleted: true
            }});
        });

        await store.dispatch(todos.deleteTodo(todo._id));

        // Expect these actions to be dispatched
        const expectedActions = [
            { type: DELETED_TODO, _id: todo._id }
        ];

        expect(store.getActions()).toEqual(expectedActions);
    });
});
