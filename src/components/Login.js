import React from 'react'



class LoginForm extends React.Component {
    
    render() {

        // console.log(this.state.currentUserId)

        return (
            <div className="Login-Container">
                <form onSubmit={this.handleSubmit}>
                    <h3>Login</h3>
                    <input 
                        type="text" 
                        name="username" 
                        id="username"
                        onChange={this.props.handleChange}
                        value={this.props.username}
                        placeholder="username"
                    />
                    <br/>
                    <input 
                        type="password"
                        name="password"
                        id="password"
                        onChange={this.props.handleChange}
                        value={this.props.password}
                        placeholder="password"
                    />
                </form>
                <div className="login-options">
                    <button className="login" onClick={() => this.props.handleSignIn()}>Login</button>
                    <button className="register" onClick={() => this.props.handleSignUp()}>Register</button>
                </div>
            </div>
        )
    }
}

export default LoginForm