import React, {Component} from "react"

import {Form, FormGroup, Input, Label, Button, ButtonGroup} from "reactstrap"

import "./results.css"

export default class EditResults extends Component {

    state = {
        body: "",
        title: ""
    }

    componentDidMount(){
        this.setState({
            body: this.props.body,
            title: this.props.title
        })
    }

    handleFieldChange = (event) => {
        const stateToChange = {}
        stateToChange[event.target.id] = event.target.value
        this.setState(stateToChange)
    }


    handleSave = (event) => {
        event.preventDefault()
        let edit = {
            id: Number(sessionStorage.getItem("currentEntryID")),
            userId: Number(sessionStorage.getItem("userID")),
            body: this.state.body,
            title: this.state.title,
            scoreGroup: this.props.scoreGroup,
            scoreGroupId: this.props.scoreGroupId,
            avgScore: this.props.averageScore
        }
        this.props.onSave(edit)
    }

    handleGoBack = (event) => {
        event.preventDefault()
        this.props.goBack();
    }

    render() {
        return (
          <React.Fragment>
            <Form>
                <FormGroup>
                    <Label for="title">Title</Label>
                    <Input 
                    type="text"
                    id="title"
                    name="title"
                    onChange={this.handleFieldChange}
                    value={this.state.title}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="body">Entry</Label>
                    <Input 
                    type="textarea"
                    id="body"
                    name="body"
                    onChange={this.handleFieldChange}
                    value={this.state.body}
                    className="editTextarea"
                    />
                </FormGroup>
                <ButtonGroup>
                    <Button onClick={this.handleSave}>Save Edits</Button>
                    <Button onClick={this.handleGoBack}>Discard Edits</Button> 
                </ButtonGroup>
            </Form>
        </React.Fragment>  
        )
        
    }
}