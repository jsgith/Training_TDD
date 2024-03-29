import React from 'react'

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
                    <label>Display Name</label>
                    <input
                        className='form-control'
                        placeholder="Your display name" 
                        value={this.state.displayName}
                        onChange={this.onChangeDisplayName}
                    />
                    <div className='invalid-feedback'>
                        {this.state.errors.displayName}
                    </div>
                </div>
                <div className='col-12 mb-3'>
                    <label>Username</label>
                    <input 
                        className='form-control'
                        placeholder="Your Username"
                        value={this.state.username}
                        onChange={this.onChangeUsername}
                    />
                </div>
                <div className='col-12 mb-3'>
                    <label>Password</label>
                    <input
                        className='form-control' 
                        placeholder="Your Password" 
                        type="password" 
                        onChange={this.onChangePassword}
                    />
                </div>
                <div className='col-12 mb-3'>
                    <label>Password Repeat</label>
                    <input
                        className='form-control'
                        placeholder="Repeat your Password" 
                        type="password" 
                        onChange={this.onChangePasswordRepeat}
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