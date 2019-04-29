import React, {Component} from 'react'
import {Route, Redirect} from "react-router-dom"
import Login from "./login/Login"

class ApplicationViews extends Component {

    state = {
        userID: 0
    }

    onLogin = () => {
        this.setState({
            userID: sessionStorage.getItem("userID")
        })
    }

    render(){
        return (
            <Route exact path="/" render={ props => {
                return <Login onLogin={this.onLogin} {...props} />
            }} />
        )
    }
}

export default ApplicationViews
