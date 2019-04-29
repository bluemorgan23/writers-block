import React, {Component} from 'react'
import {Route, Redirect} from "react-router-dom"
import Login from "./login/Login"

class ApplicationViews extends Component {
    render(){
        return (
            <Route exact path="/" render={ props => {
                return <Login />
            }} />
        )
    }
}

export default ApplicationViews
