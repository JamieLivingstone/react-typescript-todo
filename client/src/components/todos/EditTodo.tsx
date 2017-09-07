import * as React from 'react';
import { ITodoItem } from '../../../../shared_interfaces';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import * as moment from 'moment';

const DAY_FORMAT = 'DD/MM/YYYY';
export const formatDate = (date: moment.Moment) => moment(date).local(true).format(DAY_FORMAT);

interface IProps {
    todo?: ITodoItem;
    updateTodo(todo: ITodoItem): void;
    cancel(id: number | string, isUpdating: boolean): void;
}

// Default todo if none are passed
const emptyTodo: ITodoItem  = {
    _id: '',
    userId: '',
    title: '',
    completed: false,
    isUpdating: false,
    date: moment(),
};

class EditTodo extends React.Component<IProps, ITodoItem> {
    constructor(props: IProps) {
        super(props);
        this.state = Object.assign({}, this.props.todo || emptyTodo);
        this.handleDayChange = this.handleDayChange.bind(this);
    }

    save(e: React.FormEvent<any>) {
        e.preventDefault();
        this.setState(emptyTodo);
        this.props.updateTodo(this.state);
    }

    cancel() {
        this.props.cancel(this.state._id, false);
        this.setState(Object.assign({}, emptyTodo));
    }

    handleDayChange(date: moment.Moment) {
        this.setState({ date: date });
    }

    render() {
        return (
            <li className="edit">
                <form onSubmit={(e) => this.save(e)}>
                    <label htmlFor="title">Title</label>

                    <br />

                    <input
                        name="title"
                        type="text"
                        placeholder="Enter a new todo..."
                        value={this.state.title}
                        required={true}
                        onChange={(e) =>  this.setState({ title: e.target.value })}
                    />

                    <br />

                    <label htmlFor="date">Date</label>

                    <br />

                    <DayPickerInput
                        name="date"
                        placeholder={DAY_FORMAT}
                        format={DAY_FORMAT}
                        onDayChange={this.handleDayChange}
                        value={formatDate(this.state.date)}
                    />

                    <br />

                    <a role="button" className="button" onClick={() => this.cancel()}>Cancel</a>
                    <input type="submit" value="Save" />
                </form>
            </li>
        );
    }
}

export default EditTodo;