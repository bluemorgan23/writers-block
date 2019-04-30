import React, {Component} from "react"

import {Form, FormGroup, Input, Label, Button, ButtonGroup} from "reactstrap"

export default class EditResults extends Component {

    state = {
        body: this.props.body,
        title: this.props.title
    }

    handleFieldChange = (event) => {
        const stateToChange = {}
        stateToChange[event.target.id] = event.target.value
        this.setState(stateToChange)
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
                    value={this.props.title}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="body">Entry</Label>
                    <Input 
                    type="textarea"
                    id="body"
                    name="body"
                    onChange={this.handleFieldChange}
                    value={this.props.body}
                    />
                </FormGroup>
                <ButtonGroup>
                    <Button>Save Edits</Button>
                    <Button>Discard Edits</Button> 
                </ButtonGroup>
            </Form>
        </React.Fragment>  
        )
        
    }
}