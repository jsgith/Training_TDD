import React from 'react'
import Input from '../components/Input';

//This will be the stateful parent component. That is why I will create a class. 
export class UserSignupPage extends React.Component {

    state = {
        displayName: '',
        username: '',
        password: '',
        passwordRepeat: '',
        pendingApiCall: false,
        errors: {}
    }

    onChangeDisplayName = (event) => {
        const value = event.target.value;
        this.setState({displayName: value})
    }

    onChangeUsername = (event) => {
        const value = event.target.value;
        this.setState({username: value})
    }

    onChangePassword = (event) => {
        const value = event.target.value;
        this.setState({password: value})
    }

    onChangePasswordRepeat = (event) => {
        const value = event.target.value;
        this.setState({passwordRepeat: value})
    }

    onClickSignup = () => {
        const user = {
            username: this.state.username,
            displayName: this.state.displayName,
            password: this.state.password
        };
        this.setState({pendingApiCall: true});
        this.props.actions.postSignup(user).then(response => {
            this.setState({pendingApiCall: false});
        })
        .catch(apiError => {
            let errors = { ...this.state.errors }
            if(apiError.response.data && apiError.response.data.validationErrors) {
                errors = {...apiError.response.data.validationErrors}
            }
            this.setState({ pendingApiCall: false, errors });
        });
    }; 

    render() {
        return(
            <div className='container'>
                <h1 className='text-center'>Sign Up</h1>
                <div className="col-12 mb-3">
                    <Input
                        label="Display Name"
                        className='form-control'
                        placeholder="Your display name" 
                        value={this.state.displayName}
                        onChange={this.onChangeDisplayName}
                        hasError={this.state.errors.displayName && true}
                        error={this.state.errors.displayName}
                    />
                </div>
                <div className='col-12 mb-3'>
                    <Input
                        label="Username"
                        className='form-control'
                        placeholder="Your Username"
                        value={this.state.username}
                        onChange={this.onChangeUsername}
                        hasError={this.state.errors.username && true}
                        error={this.state.errors.username}
                    />
                </div>
                <div className='col-12 mb-3'>
                    <Input
                        label="Password"
                        className='form-control' 
                        placeholder="Your Password" 
                        type="password" 
                        onChange={this.onChangePassword}
                        hasError={this.state.errors.password && true}
                        error={this.state.errors.password}
                    />
                </div>
                <div className='col-12 mb-3'>
                    <Input
                        label="Password Repeat"
                        className='form-control'
                        placeholder="Repeat your Password" 
                        type="password" 
                        onChange={this.onChangePasswordRepeat}
                        hasError={this.state.errors.passwordRepeat && true}
                        error={this.state.errors.passwordRepeat}
                    />
                </div>
                <div className='text-center'>
                    <button 
                        className='btn btn-primary btn-lg' 
                        onClick={this.onClickSignup}
                        disabled={this.state.pendingApiCall}    
                    >
                        {this.state.pendingApiCall && (<div className="spinner-grow text-light spinner-border-sm mr-sm-1" role="status">
                             <span className="sr-only">Loading...</span>
                        </div>)}
                        Sign Up
                    </button>
                </div>
            </div>
        )
    }
}

UserSignupPage.defaultProps = {
    actions: {
        postSignup: () => new Promise((resolve, reject) => {
            resolve({});
        })
    }
}

export default UserSignupPage;