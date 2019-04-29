// React Imports
import React, {Component} from 'react'
import {Route, Redirect} from "react-router-dom"

// Module Imports
import userData from '../modules/userData';

// Component Imports
import Register from "./register/Register"
import Login from "./login/Login"
import NewEntry from './newEntry/NewEntry';


class ApplicationViews extends Component {

    state = {
        userID: 0,
        entry: "",
        sentenceArray: []
    }

    componentDidMount(){
        this.setState({
            userID: sessionStorage.getItem("userID")
        })
    }

    isAuthenticated = () => sessionStorage.getItem("userID") !== null

    onRegister = (userToRegister) => {
        return userData.postUser(userToRegister)
            .then(() => userData.getAllUsers())
            .then(userList => {
                return userList.find(user => user.username.toLowerCase() === userToRegister.username.toLowerCase())
            })
            .then(matchedUser => this.setState({
                userID: matchedUser.id
            }))
    }

    onLogin = () => {
        this.setState({
            userID: sessionStorage.getItem("userID")
        })
    }

    render(){
        return (
        <React.Fragment>
            <Route exact path="/" render={ props => {
                if(this.isAuthenticated()){
                    return <Redirect to="/stats" />
                } else {
                    return <Login onLogin={this.onLogin} {...props} />
                }
                
            }} />
            <Route path="/register" render={ props => {
                if(this.isAuthenticated()){
                    return <Redirect to="/stats" />
                } else {
                    return <Register onRegister={this.onRegister} {...props} />
                }
                
            }} />
            <Route path="/new-entry" render={ props => {
                if(this.isAuthenticated()){
                    return <NewEntry {...props} />
                } else {
                    return <Redirect to="/" />
                }
                
            }} />
        </React.Fragment>
            
        )
    }
}

export default ApplicationViews
