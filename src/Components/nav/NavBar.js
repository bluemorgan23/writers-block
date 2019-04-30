import React, {Component} from "react"
import {Link} from "react-router-dom"

import logout from "../../modules/logout"

import {Nav} from "reactstrap"

import "./navbar.css"

export default class NavBar extends Component {

    
    render() {
        

        return (
            <Nav className="navBar">
                <Link className="nav-link" to="/new-entry">New Entry</Link>
                <Link className="nav-link" to="/results" >Results</Link>
                <Link className="nav-link" to="/stats">Stats</Link>
                <Link onClick={logout}className="nav-link" to="/">Logout</Link>
            </Nav> 
        )
    }
}