import * as React from 'react';
import { IAuthenticationState } from '../../interfaces';
import { ILoginUser } from '../../../../shared_interfaces';

interface IProps extends IAuthenticationState {
    handleLogin: (credentials: ILoginUser) => void;
    displaySignInForm: () => void;
    displaySignUpForm: () => void;
}

class SignIn extends React.Component<IProps, ILoginUser> {
    constructor() {
        super();
        this.state = {email: '', password: ''};
    }

    handleLogin(e: React.SyntheticEvent<HTMLFormElement>) {
        e.preventDefault();
        this.props.handleLogin(this.state);
    }

    public render(): JSX.Element {
        return (
            <form onSubmit={e => this.handleLogin(e)} className="form">
                <h1 className="margin-b-40">
                    <span className="current text-link" onClick={() => this.props.displaySignInForm()}>Sign In</span>
                    <span className="small">or</span>
                    <span className="text-link" onClick={() => this.props.displaySignUpForm()}>Sign Up</span>
                </h1>

                <label htmlFor="email">E-MAIL</label>
                <br/>
                <input
                    type="email"
                    placeholder="Your e-mail goes here"
                    title="Please enter your e-mail address"
                    value={this.state.email}
                    onChange={(e) => this.setState({email: e.target.value})}
                    required={true}
                />
                <br/>

                <label htmlFor="password">PASSWORD</label>
                <br/>
                <input
                    type="password"
                    name="password"
                    placeholder="Enter a secure password"
                    title="Please enter a secure password"
                    value={this.state.password}
                    onChange={(e) => this.setState({password: e.target.value})}
                    required={true}
                />
                <br/>

                {
                    this.props.loginMessage && this.props.loginMessage.length > 0 &&
                    <p className="margin-t-30">{this.props.loginMessage}</p>
                }

                <div className="margin-t-30">
                    <input
                        type="submit"
                        value={this.props.isFetching ? 'Signing In...' : 'Sign In'}
                        disabled={this.props.isFetching}
                        className="inline"
                    />

                    <p
                        className="inline margin-l-20 grey-underline text-link"
                        title="Sign In"
                        role="button"
                        onClick={() => this.props.displaySignUpForm()}
                    >
                        I don't have an account
                    </p>
                </div>
            </form>
        );
    }
}

export default SignIn;