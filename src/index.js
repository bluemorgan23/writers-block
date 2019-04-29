 // React Imports
import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter as Router} from "react-router-dom"

// Component Imports
import WritersBlock from "./Components/WritersBlock"

// Stylesheet Imports
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'

ReactDOM.render(
    <Router>
       <WritersBlock /> 
    </Router>
    , document.getElementById('root'))


