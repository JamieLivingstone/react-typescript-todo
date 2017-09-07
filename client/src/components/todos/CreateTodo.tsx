import * as React from 'react';
import EditTodo from './EditTodo';
import { ITodoItem } from '../../../../shared_interfaces';

interface IProps {
    create: (todo: ITodoItem) => any;
}

interface IState {
    isAdding: boolean;
}

class CreateTodo extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = { isAdding: false };
        this.cancel = this.cancel.bind(this);
        this.create = this.create.bind(this);
    }

    cancel() {
        this.setState({ isAdding: false });
    }

    create(todo: ITodoItem) {
        this.setState({ isAdding: false });
        this.props.create(todo);
    }

    render() {
        if (this.state.isAdding) {
            return (
                <EditTodo updateTodo={this.create} cancel={this.cancel} />
            );
        }

        return (
            <li onClick={() => this.setState({ isAdding: true })}>+ Add Todo</li>
        );
    }
}

export default CreateTodo;