// React imports
import React, {Component} from "react"
import {Link} from "react-router-dom"

// Style imports
import { Button, Form, FormGroup, Label, Input, Card, CardBody, CardText, CardHeader, CardTitle } from "reactstrap"
import "./login.css"

export default class Login extends Component {
    
    state = {
        username: "",
        password: ""
    }

    handleFieldChange = (event) => {
        let stateToChange = {}
        stateToChange[event.target.id] = event.target.value
        this.setState(stateToChange)
    }

    render() {
        return (
            <Card className="loginCard">
                <CardHeader className="loginCard-header">Welcome to The Writer's Block</CardHeader>
                <CardBody>
                    <CardTitle className="loginMessage">Please Login To Your Account</CardTitle>
                   <Form>
                        <FormGroup>
                            <Label for="username">Username: </Label>
                            <Input 
                                type="text" 
                                name="username" 
                                id="username"
                                placeholder="Enter Your Username"
                                onChange={this.handleFieldChange}
                                value={this.state.username} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="password">Password: </Label>
                            <Input 
                                type="password" 
                                name="password" 
                                id="password"
                                placeholder="Enter Your Password"
                                onChange={this.handleFieldChange}
                                value={this.state.password} />
                        </FormGroup>
                        <div className="buttonLink-container">
                            <Button className="mb-2">Submit</Button>
                            <Link to="/register">Click here to register a new account</Link>
                        </div>
                    </Form> 
                </CardBody>
            </Card>
            
        )
    }
}