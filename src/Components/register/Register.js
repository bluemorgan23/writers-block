// React Imports
import React, {Component} from "react"

// Module Imports
import userData from "../../modules/userData"

// Styling Imports
import { Button, Form, FormGroup, Label, Input, Card, CardBody, CardHeader, CardTitle, Badge, CardSubtitle } from "reactstrap"
import "./register.css"

export default class Register extends Component {
    
    state = {
        username: "",
        password: "",
    }

    handleFieldChange = (event) => {
        const stateToChange = {}
        stateToChange[event.target.id] = event.target.value
        this.setState(stateToChange)
    }

    handleRegister = (event) => {
        event.preventDefault()
        userData.getAllUsers()
            .then(userList => {
               return userList.find(user => user.username.toLowerCase() === this.state.username) 
            }).then(matchedUser => {
                if(matchedUser){
                    return window.alert("An account with this username already exists!")
                } else {
                    let userObj = {
                        username: this.state.username,
                        password: this.state.password
                    }
                    this.props.onRegister(userObj)
                    .then(() => userData.getAllUsers())
                    .then(userList => {
                        return userList.find(user => 
                            user.username.toLowerCase() === this.state.username.toLowerCase())
                }).then(matchedUser => sessionStorage.setItem("userID", matchedUser.id))
                .then(() => this.props.history.push("/new-entry"))
                }
            })
    }

    render() {
        return (
            <Card className="registerCard mt-3">
                <CardHeader className="registerCard-header text-center bg-secondary text-white">
                    <h1>
                        <Badge>
                            Register a New Account
                        </Badge>
                    </h1>
                    <CardSubtitle  
                    text-muted={true}
                    className="registerMessage">Please enter your preferred username and password to register</CardSubtitle>
                </CardHeader>
                <CardBody className="bg-light">
                   <Form onSubmit={this.handleRegister} >
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
                        <FormGroup className="mb-4">
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
                        <hr></hr>
                        <div className="registerButtons-container">
                            <Button color="dark"
                            >Register</Button>
                            <Button color="danger"
                            onClick={() => this.props.history.push("/")} >Go Back</Button>
                        </div>
                    </Form> 
                </CardBody>
            </Card>
        )
    }

}