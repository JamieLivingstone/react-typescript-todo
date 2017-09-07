import * as React from 'react';
import { browserHistory } from 'react-router';
import SignUp from './SignUp';
import SignIn from './SignIn';
import { IAppState } from '../../interfaces';

export default function AuthenticationView(props: IAppState) {
    const authenticationActions =  props.actions.authentication;

    return (
        <div className="container authentication">
            <div className="col bg-blue vertical-fill vertical-center padding-30">
                {
                    props.authentication.isSignInForm &&
                    <SignIn
                        handleLogin={authenticationActions.loginUser}
                        displaySignInForm={authenticationActions.displaySignInForm}
                        displaySignUpForm={authenticationActions.displaySignUpForm}
                        {...props.authentication}
                    />
                }

                {
                    !props.authentication.isSignInForm &&
                    <SignUp
                        handleRegister={authenticationActions.registerUser}
                        displaySignInForm={authenticationActions.displaySignInForm}
                        displaySignUpForm={authenticationActions.displaySignUpForm}
                        {...props.authentication}
                    />
                }
            </div>
        </div>
    );
}
