export interface IUser {
    fullName: string;
    email: string;
    password?: string;
}

export interface ILoginUser {
    email: string;
    password: string;
}

interface IAuthenticationResponse {
    isAuthenticated: boolean,
    token: string,
    user: IUser,
    error?: string
}

interface ITodoItem {
    _id: string | number,
    userId: string,
    title: string,
    id?: any,
    completed: boolean,
    date: any,
    projectIds?: [string | number],
    isUpdating: boolean
}