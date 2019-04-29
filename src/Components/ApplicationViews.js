import React, {Component} from 'react'
import {Route, Redirect} from "react-router-dom"

import Register from "./register/Register"
import Login from "./login/Login"
import userData from '../modules/userData';

class ApplicationViews extends Component {

    state = {
        userID: 0
    }

    isAuthenticated = () => sessionStorage.getItem("userID") !== null
    

    onLogin = () => {
        this.setState({
            userID: sessionStorage.getItem("userID")
        })
    }

    onRegister = (userToRegister) => {
        return userData.postUser(userToRegister)
    }

    render(){
        return (
        <React.Fragment>
            <Route exact path="/" render={ props => {
                return <Login onLogin={this.onLogin} {...props} />
            }} />
            <Route path="/register" render={ props => {
                return <Register onRegister={this.onRegister} {...props} />
            }} />
        </React.Fragment>
            
        )
    }
}

export default ApplicationViews
