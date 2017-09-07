import { IUser, ILoginUser, ITodoItem } from '../../shared_interfaces';

interface ITodoActions {
    loadTodos: () => void;
    createTodo: (todo: ITodoItem) => void;
    updateTodo: (todo: ITodoItem) => void;
    deleteTodo: (id: string | number) => void;
    editingTodo: (id: string | number, isEditing: boolean) => void;
    completeTodo: (id: string | number) => void;
}

interface IAppState {
    authentication: IAuthenticationState;
    todos: [ITodoItem];
    actions: {
        authentication: {
            displaySignInForm: () => void;
            displaySignUpForm: () => void;
            registerUser: (credentials: IUser) => void;
            loginUser: (credentials: ILoginUser) => void;
            tokenLogin: () => void;
        },
        todos: ITodoActions,
    };
}

interface IAuthenticationAction {
    type: string;
    isFetching: boolean;
    isAuthenticated: boolean;
    message?: string;
    credentials?: ILoginUser;
    user?: IUser;
}

interface IAuthenticationState {
    user: IUser;
    error?: string;
    isFetching: boolean;
    isAuthenticated: boolean;
    isSignInForm: boolean;
    registerMessage?: string;
    loginMessage?: string;
}