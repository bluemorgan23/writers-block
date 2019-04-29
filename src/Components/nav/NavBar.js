import React, {Component} from "react"
import {Nav, NavLink} from "reactstrap"
import {Link} from "react-router-dom"

export default class NavBar extends Component {
    
    render() {
        return (
            <Nav>
                <Link className="nav-link" to="/new-entry">New Entry</Link>
                <Link className="nav-link" to="/results">Results</Link>
                <Link className="nav-link" to="/stats">Stats</Link>
                <Link className="nav-link" to="/login">Logout</Link>
            </Nav> 
        )
    }
}