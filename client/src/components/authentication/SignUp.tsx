import * as React from 'react';
import { IAuthenticationState } from '../../interfaces';
import { IUser } from '../../../../shared_interfaces';

interface IProps extends IAuthenticationState {
    handleRegister: (credentials: IUser) => void;
    displaySignInForm: () => void;
    displaySignUpForm: () => void;
}

class SignUp extends React.Component<IProps, IUser> {
    constructor() {
        super();
        this.state = {fullName: '', password: '', email: ''};
    }

    handleSignUp(e: React.SyntheticEvent<HTMLFormElement>) {
        e.preventDefault();
        this.props.handleRegister(this.state);
    }

    public render(): JSX.Element {
        return (
            <form onSubmit={e => this.handleSignUp(e)} className="form">
                <h1 className="margin-b-40">
                    <span className="text-link" onClick={() => this.props.displaySignInForm()}>Sign In</span>
                    <span className="small">or</span>
                    <span className="current text-link" onClick={() => this.props.displaySignUpForm()}>Sign Up</span>
                </h1>

                <label htmlFor="fullName">FULL NAME</label>
                <br/>
                <input
                    type="text"
                    name="fullName"
                    placeholder="Enter your full name"
                    title="Please enter your full name"
                    value={this.state.fullName}
                    onChange={(e) => this.setState({fullName: e.target.value})}
                    required={true}
                />
                <br/>

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
                    this.props.registerMessage && this.props.registerMessage.length > 0 &&
                    <p className="margin-t-30">{this.props.registerMessage}</p>
                }

                <div className="margin-t-30">
                    <input
                        type="submit"
                        value={this.props.isFetching ? 'Registering...' : 'Sign Up'}
                        disabled={this.props.isFetching}
                        className="inline"
                    />

                    <p
                        className="inline margin-l-20 grey-underline text-link"
                        title="Sign In"
                        role="button"
                        onClick={() => this.props.displaySignInForm()}
                    >
                        I'm already a member
                    </p>
                </div>
            </form>
        );
    }
}

export default SignUp;