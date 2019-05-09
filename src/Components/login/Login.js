// React imports
import React, {Component} from "react"
import {Link} from "react-router-dom"

// Module imports
import userData from "../../modules/userData"

// Style imports
import { Button, Form, FormGroup, Label, Input, Card, CardBody, CardHeader, CardTitle, CardFooter, Badge, CardSubtitle } from "reactstrap"
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

    handleLogin = (event) => {
        event.preventDefault()

        return userData.getAllUsers()
            .then(listOfUsers => {
                let foundUser = listOfUsers.find(user => user.username.toLowerCase() === this.state.username.toLowerCase() && user.password === this.state.password)

                return foundUser
            }).then(matchedUser => {
                if(matchedUser){
                   sessionStorage.setItem("userID", Number(matchedUser.id))
                   this.props.history.push("/new-entry")
                } else {
                    window.alert("Invalid login information")
                }
            })
    }

    render() {
        return (
            <Card className="loginCard mt-3">
                <CardHeader className="loginCard-header text-center bg-secondary text-white">
                    <h1>
                        <Badge>
                           Welcome to The Writer's Block 
                        </Badge>
                    </h1>
                    <CardTitle className="loginMessage">
                    Please Login To Your Account
                    </CardTitle>
                </CardHeader>
                <CardBody className="bg-light">
                    
                   <Form>
                        <FormGroup>
                            <Label for="username">Username: </Label>
                            <Input 
                                required
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
                                required
                                type="password" 
                                name="password" 
                                id="password"
                                placeholder="Enter Your Password"
                                onChange={this.handleFieldChange}
                                value={this.state.password} />
                        </FormGroup>
                        
                    </Form> 
                </CardBody>
                <CardFooter className="buttonLink-container bg-light">
                    <Button onClick={this.handleLogin}
                        color="dark"
                        className="mb-2 mt-2">Submit</Button>
                    <Link to="/register">Click here to register a new account</Link>
                </CardFooter>
            </Card>
            
        )
    }
}