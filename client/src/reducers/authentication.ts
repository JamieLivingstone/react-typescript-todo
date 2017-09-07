import {
    DISPLAY_SIGN_IN,
    DISPLAY_SIGN_UP,
    REGISTER_REQUEST,
    REGISTER_FAILURE,
    REGISTER_SUCCESS,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
} from '../actions/authentication';

import { IAuthenticationAction, IAuthenticationState } from '../interfaces';

export const initialState: IAuthenticationState = {
    isFetching: false,
    isAuthenticated: false,
    isSignInForm: true,
    user: { fullName: '', email: '' },
};

export default function authenticationReducer(state: IAuthenticationState = initialState, action: any): IAuthenticationState {
    switch (action.type) {
        case DISPLAY_SIGN_IN:
            return Object.assign({}, state, {
                isFetching: false,
                isSignInForm: true,
                registerMessage: '',
                loginMessage: ''
            });

        case DISPLAY_SIGN_UP:
            return Object.assign({}, state, {
                isFetching: false,
                isSignInForm: false,
                registerMessage: '',
                loginMessage: ''
            });

        case REGISTER_REQUEST:
            return Object.assign({}, state, {
                isFetching: true,
                isAuthenticated: false
            });

        case REGISTER_FAILURE:
            return Object.assign({}, state, {
                isFetching: false,
                isAuthenticated: false,
                registerMessage: action.message
            });

        case REGISTER_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                isAuthenticated: true,
                user: action.user,
                registerMessage: 'Registered successfully'
            });

        case LOGIN_REQUEST:
            return Object.assign({}, state, {
                isFetching: true,
                isAuthenticated: false
            });

        case LOGIN_FAILURE:
            return Object.assign({}, state, {
                isFetching: false,
                isAuthenticated: false,
                loginMessage: action.message
            });

        case LOGIN_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                isAuthenticated: true,
                user: action.user,
                loginMessage: 'Logged in successfully',
            });

        default:
            return state;
    }
}
