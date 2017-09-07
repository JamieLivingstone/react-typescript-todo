import * as React from 'react';
import EditTodo from './EditTodo';
import CreateTodo from './CreateTodo';
import { ITodoActions } from '../../interfaces';
import { formatDate } from './EditTodo';
import { ITodoItem } from '../../../../shared_interfaces';

const renderTodos = (todos: ITodoItem[], action: ITodoActions) => todos.map((todo, index) => {
    return todo.isUpdating ? (
        <EditTodo
            todo={todo}
            key={index}
            updateTodo={action.updateTodo}
            cancel={action.editingTodo}
        />
    ) : (
        <li key={index}>
            <div className="float-left">
                <input type="checkbox" onChange={(e) => action.completeTodo(todo._id)} checked={todo.completed} />
            </div>

            <div className="todo-content">
                <p onClick={() => action.editingTodo(todo._id, true)}>{todo.title}</p>

                <p>Date: {formatDate(todo.date)}</p>

                <button onClick={() => action.editingTodo(todo._id, true)}>Edit</button>
                <button onClick={() => action.deleteTodo(todo._id)}>Delete</button>
            </div>
        </li>
    );
});

export default (props: { title: string, todos: ITodoItem[], actions: ITodoActions }) => (
    <div>
        <h1>{props.title || 'Todos'}</h1>

        <ul>
            {renderTodos(props.todos, props.actions)}
            <CreateTodo create={props.actions.createTodo}/>
        </ul>
    </div>
);