import * as React from 'react';
import * as moment from 'moment';
import TodoList from './TodoList';
import { IAppState } from '../../interfaces';
import { ITodoItem } from '../../../../shared_interfaces';

interface IState {
    title: string;
    fetchedTodos: boolean;
    todos: ITodoItem[];
    selectedFilter: number;
}

// Sidebar date filters
const dateFilters = [
    {
        name: 'Today',
        date: moment(moment.now()).endOf('day')
    },
    {
        name: '7 days',
        date: moment(moment.now()).add(1, 'days').endOf('day')
    },
    {
        name: '1 month',
        date: moment(moment.now()).add(1, 'month').endOf('day')
    },
    {
        name: '3 months',
        date: moment(moment.now()).add(3, 'month').endOf('day')
    },
    {
        name: 'All',
        date: -1
    }
];

class TodoView extends React.Component<IAppState, IState> {
    constructor(props: IAppState) {
        super(props);

        this.state = {
            title: '7 days',
            todos: [],
            selectedFilter: 0,
            fetchedTodos: false
        };
    }

    componentDidUpdate() {
        if (!this.state.fetchedTodos) {
            this.setState({ fetchedTodos: true });
            this.props.actions.todos.loadTodos();
        }
    }

    componentWillReceiveProps(props: IAppState) {
        this.setState({ todos: props.todos });
    }

    filteredTodos(): ITodoItem[] {
        const currentFilter = dateFilters[this.state.selectedFilter];

        // Show all items
        if (currentFilter.date === -1) {
            return this.state.todos;
        }

        // Filter based on time
        return this.state.todos.filter(todo => moment(todo.date).isBefore(currentFilter.date));
    }

    render() {
        if (!this.props.authentication.isAuthenticated) {
            return <div/>;
        }

        return (
            <div className="container todos">
                <div className="col sidebar">
                    <h2>Filter</h2>
                    <ul>
                        {dateFilters.map((date, index) => (
                            <li
                                key={index}
                                className={`${index === this.state.selectedFilter ? 'active' : ''}`}
                                title={date.name}
                                onClick={() => this.setState({ selectedFilter: index })}
                            >
                                {date.name}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="todos-section">
                    <TodoList
                        title={dateFilters[this.state.selectedFilter].name}
                        todos={this.filteredTodos()}
                        actions={this.props.actions.todos}
                    />
                </div>
            </div>
        );
    }
}

export default TodoView;