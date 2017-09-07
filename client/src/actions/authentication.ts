import axios from 'axios';
import { push } from 'react-router-redux';
import { IAuthenticationAction } from '../interfaces';
import { IAuthenticationResponse, ILoginUser, IUser } from '../../../shared_interfaces';
import constants from '../constants';

// API Endpoint
const API_URL = constants.api_url;

// Set auth header for future requests
const setAuthHeader = (token: string) => axios.defaults.headers.common.Authorization = token;

// Constants
export const DISPLAY_SIGN_IN = 'DISPLAY_SIGN_IN';
export const DISPLAY_SIGN_UP = 'DISPLAY_SIGN_UP';

export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILURE = 'REGISTER_FAILURE';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

/*
    TOGGLE Actions
*/
export function displaySignInForm() {
    return {
        type: DISPLAY_SIGN_IN
    };
}

export function displaySignUpForm() {
    return {
        type: DISPLAY_SIGN_UP
    };
}

/*
    REGISTRATION Actions
*/
function requestRegistration() {
    return {
      type: REGISTER_REQUEST
    };
}

function registrationSuccess(response: IAuthenticationResponse) {
    setAuthHeader(response.token);

    return {
        type: REGISTER_SUCCESS,
        user: response.user,
    };
}

function registrationError(message: string) {
    return {
        type: REGISTER_FAILURE,
        message
    };
}

export function registerUser(credentials: IUser) {
    return (dispatch: Function): void => {
        dispatch(requestRegistration());
        axios.post(`${API_URL}/register`, credentials)
                .then(res => {
                    const data: IAuthenticationResponse = res.data;

                    // API returned explicit error (i.e validation failed, user exists)
                    if (data.error) {
                        return dispatch(registrationError(data.error));
                    }

                    // API registered successfully, redirect to app
                    if (data.hasOwnProperty('user') && data.isAuthenticated && data.hasOwnProperty('token')) {
                        // Inform store login was successful
                        dispatch(registrationSuccess(data));

                        // Add/Update token in LocalStorage for future sessions
                        localStorage.setItem('token', data.token);

                        // Redirect ao app
                        dispatch(push('/app'));
                        return;
                    }

                    // API didn't return one of the above... should never happen
                    dispatch(registrationError(constants.genericError));
                })
                .catch((e: { message: string}) => dispatch(registrationError(e.message)));
    };
}

/*
    LOGIN Actions
*/
function requestLogin(credentials: ILoginUser) {
    return {
        type: LOGIN_REQUEST,
        credentials
    };
}

function loginSuccess(response: IAuthenticationResponse) {
    setAuthHeader(response.token);
    return {
        type: LOGIN_SUCCESS,
        user: response.user,
    };
}

function loginError(message: string) {
    return {
        type: LOGIN_FAILURE,
        message
    };
}

export function loginUser(credentials: ILoginUser) {
    return (dispatch: Function): void => {
        dispatch(requestLogin(credentials));
        axios.post(`${API_URL}/login`, credentials)
            .then(res => {
                const data: IAuthenticationResponse = res.data;

                // API returned explicit error (i.e validation failed, user exists)
                if (data.error) {
                    return dispatch(loginError(data.error));
                }

                // API registered successfully
                if (data.user && data.isAuthenticated) {
                    // Inform store login was successful
                    dispatch(loginSuccess(data));

                    // Add/Update token in LocalStorage for future sessions
                    localStorage.setItem('token', data.token);

                    // Redirect to app
                    dispatch(push('/app'));
                    return;
                }

                // API didn't return one of the above... should never happen
                dispatch(loginError(constants.genericError));
            })
            .catch(() => dispatch(loginError(constants.genericError)));
    };
}

export function tokenLogin() {
    // Get JSON web token from LocalStorage
    const token = localStorage.getItem('token');

    if (token && typeof token === 'string') {
        // Set auth header to allow all requests to work with authenticated routes
        setAuthHeader(token);

        // Dispatch request to verify token is a valid user and retrieve profile
        return (dispatch: Function): void => {
            axios.post(`${API_URL}/token`)
                .then(res => {
                    const data: IAuthenticationResponse = res.data;

                    // Valid token, log user in and display app
                    if (data.isAuthenticated && data.hasOwnProperty('token')) {
                        dispatch(loginSuccess(data));
                        dispatch(push('/app'));
                    }
                })
                .catch(() => {
                    // Redirect to login/register page
                    dispatch(push('/'));

                    // Remove token to prevent duplicate requests
                    localStorage.removeItem('token');
                });
        };
    }

    // If no token only allow access to login /register page
    return (dispatch: Function) => dispatch(push('/'));
}