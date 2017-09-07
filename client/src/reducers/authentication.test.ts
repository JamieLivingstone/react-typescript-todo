import reducer, { initialState } from './authentication';

import {
    DISPLAY_SIGN_IN,
    DISPLAY_SIGN_UP,
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    REGISTER_FAILURE,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE
} from '../actions/authentication';

describe('authentication reducer', () => {
    it('should return the initial state', () => {
        expect(reducer(initialState, {})).toEqual(initialState);
    });

    it('should handle display sign in', () => {
        expect(reducer(initialState, {
            type: DISPLAY_SIGN_IN
        })).toEqual(Object.assign({}, initialState, {
                loginMessage: '',
                registerMessage: ''
            }));
    });

    it('should handle display sign up', () => {
        expect(reducer(initialState, {
            type: DISPLAY_SIGN_UP
        })).toEqual(Object.assign({}, initialState, {
            isSignInForm: false,
            loginMessage: '',
            registerMessage: ''
        }));
    });

    it('should handle register request', () => {
        expect(reducer(initialState, {
            type: REGISTER_REQUEST
        })).toEqual(Object.assign({}, initialState, {
            isFetching: true
        }));
    });

    it('should handle register success', () => {
        expect(reducer(initialState, {
            type: REGISTER_SUCCESS,
            user: {
                email: 'test@gmail.com',
                name: 'test name'
            }
        })).toEqual(Object.assign({}, initialState, {
            user: {
                email: 'test@gmail.com',
                name: 'test name'
            },
            isAuthenticated: true,
            registerMessage: 'Registered successfully'
        }));
    });

    it('should handle register failure', () => {
        expect(reducer(initialState, {
            type: REGISTER_FAILURE,
            message: 'some error'
        })).toEqual(Object.assign({}, initialState, {
            isAuthenticated: false,
            registerMessage: 'some error'
        }));
    });

    it('should handle login request', () => {
        expect(reducer(initialState, {
            type: LOGIN_REQUEST
        })).toEqual(Object.assign({}, initialState, {
            isFetching: true
        }));
    });

    it('should handle login success', () => {
        expect(reducer(initialState, {
            type: LOGIN_SUCCESS,
            user: {
                email: 'example@gmail.com',
                name: 'test'
            }
        })).toEqual(Object.assign({}, initialState, {
            isFetching: false,
            user: {
                email: 'example@gmail.com',
                name: 'test'
            },
            isAuthenticated: true,
            loginMessage: 'Logged in successfully'
        }));
    });

    it('should handle login failure', () => {
        expect(reducer(initialState, {
            type: LOGIN_FAILURE,
            message: 'Login failed'
        })).toEqual(Object.assign({}, initialState, {
            isFetching: false,
            loginMessage: 'Login failed'
        }));
    });
});
