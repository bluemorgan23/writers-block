import React, {Component} from "react"
import {Link} from "react-router-dom"

import logout from "../../modules/logout"

import {Navbar, NavItem} from "reactstrap"

import "./navbar.css"

export default class NavBar extends Component {

    
    render() {
        

        return (
            <Navbar className="navBar" dark={true} color="dark">
                <NavItem className="NavList">
                    <Link className="nav-link" to="/new-entry">
                    New Entry
                    </Link>
                </NavItem>
                <NavItem className="NavList">
                    <Link className="nav-link" to="/results" >
                    Results
                    </Link>
                </NavItem>
                <NavItem className="NavList">
                    <Link className="nav-link" to="/stats">
                    Stats
                    </Link>
                </NavItem>
                <NavItem className="NavList">
                    <Link onClick={logout}className="nav-link" to="/">
                    Logout
                    </Link>
                </NavItem>
            </Navbar> 
        )
    }
}