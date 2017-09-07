import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as authentication from './authentication';
import axios from 'axios';
import { IAuthenticationAction } from '../interfaces';
import { ILoginUser, IUser } from '../../../shared_interfaces';

// Create a mock store
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

// Mock store fields
const authStore = {
    isFetching: false,
    isAuthenticated: false,
    isSignInForm: true,
    user: { fullName: '', email: '' },
    message: ''
};

// Action names
const {
    DISPLAY_SIGN_IN,
    DISPLAY_SIGN_UP,
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    REGISTER_FAILURE,
    LOGIN_FAILURE,
    LOGIN_SUCCESS,
    LOGIN_REQUEST
} = authentication;

// Test authentication actions
describe('authentication actions', () => {
    // Toggling between forms
    describe('form displays', () => {
        it('should create an action to show sign in form', () => {
            expect(authentication.displaySignInForm()).toEqual({
                type: DISPLAY_SIGN_IN
            });
        });

        it('should create an action to show sign up form', () => {
            expect(authentication.displaySignUpForm()).toEqual({
                type: DISPLAY_SIGN_UP
            });
        });
    });

    // Register a user
    describe('register user', () => {
        it('should dispatch errors from bad inputs', async () => {
            const store = mockStore(Object.assign({}, authStore));
            const errorMessage = 'Invalid email address';

            // Change post to return an error promise
            axios.post = jest.fn(() => {
                return Promise.resolve({ data: { error: errorMessage } });
            });

            // Dispatch register user
            await store.dispatch(authentication.registerUser({
                email: 'test',
                fullName: 'random name'
            }));

            // Expect these actions to be dispatched
            const expectedActions = [
                { type: REGISTER_REQUEST },
                { type: REGISTER_FAILURE, message: errorMessage },
            ];

            expect(store.getActions()).toEqual(expectedActions);
        });

        // Successful registration
        it('should dispatch success from valid registration', async () => {
            const store = mockStore(Object.assign({}, authStore));

            const user: IUser = {
                email: 'test@gmail.com',
                fullName: 'random name'
            };

            // Change post to return an success promise
            axios.post = jest.fn(() => {
                return Promise.resolve({ data: {
                    isAuthenticated: true,
                    token: 'Bearer: ZGFh',
                    user
                }});
            });

            // Dispatch register user
            await store.dispatch(authentication.registerUser(user));

            // Expect these actions to be dispatched
            const expectedActions = [
                { type: REGISTER_REQUEST },
                { type: REGISTER_SUCCESS, user },
            ];

            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    // User login
    describe('login user', () => {
        // Login fail
        it('should dispatch errors from bad login credentials', async () => {
            const store = mockStore(Object.assign({}, authStore));
            const error = 'Invalid login credentials';

            // Change post to return authentication error
            axios.post = jest.fn(() => {
                return Promise.resolve({ data: {
                    isAuthenticated: false,
                    error
                }});
            });

            // Fake login details
            const loginCredentials: ILoginUser = {
                email: 'test@gmail.com',
                password: 'invalidPassword'
            };

            // Dispatch login with fake details
            await store.dispatch(authentication.loginUser(loginCredentials));

            // Expect these actions to be dispatched
            const expectedActions = [
                { type: LOGIN_REQUEST, credentials: loginCredentials },
                { type: LOGIN_FAILURE, message: error },
            ];

            expect(store.getActions()).toEqual(expectedActions);
        });

        // Login success
        it('should dispatch login success', async () => {
            const store = mockStore(Object.assign({}, authStore));

            // Fake login credentials
            const loginCredentials: ILoginUser = {
                email: 'test@gmail.com',
                password: 'invalidPassword'
            };

            // Change post to return authentication success
            axios.post = jest.fn(() => {
                return Promise.resolve({ data: {
                    isAuthenticated: true,
                    token: 'Bearer 34erer',
                    user: loginCredentials
                }});
            });

            // Dispatch login action
            await store.dispatch(authentication.loginUser(loginCredentials));

            // Expect these actions to be dispatched
            const expectedActions = [
                { type: LOGIN_REQUEST, credentials: loginCredentials },
                { type: LOGIN_SUCCESS, user: loginCredentials }
            ];

            expect(store.getActions()).toEqual(expectedActions);
        });
    });
});
