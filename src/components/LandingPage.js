import React from 'react';
import Header from './header.js';
import LoginForm from './Login.js';
import SearchBox from './SearchBox.js';
import TopTen from './TopTen.js';

class LandingPage extends React.Component {
    render() {
        return (
            <div className="page-container">
                <div className="landing-container">
                    <Header />
                    <div className='content-container'>
                        <div className="left-content">
                            <LoginForm 
                                handleSignIn={this.props.handleSignIn}
                                handleSignUp={this.props.handleSignUp}
                                handleChange={this.props.handleChange}
                                username={this.props.username}
                                password={this.props.password}
                            />
                        </div>
                        <div className="right-content">
                            <SearchBox 
                                currencies={this.props.currencies}
                                clearSearch={this.props.clearSearch}
                                userId={this.props.currenctUserId}
                                login={this.props.login}
                                />
                            <TopTen />
                        </div>
                    </div>
                </div>
            </div>
        )
    }

};

export default LandingPage;