import React, {Component} from "react"

import { Card, CardBody, CardHeader, CardText, CardTitle, Button, Form, FormGroup, Label, Input, FormText } from "reactstrap"


export default class NewEntry extends Component {
    
    state = {
        title: "",
        entry: "",
    }

    handleFieldChange = (event) => {
        let stateToChange = {}
        stateToChange[event.target.id] = event.target.value
        this.setState(stateToChange)
    }

    render() {
        return (
            <Card>
                <CardHeader>Create a New Entry</CardHeader>
                <CardBody>
                    <CardTitle>Insert your entry and its title here. Click the "Analyze" button for text-analysis to begin.</CardTitle>
                    <Form>
                        <FormGroup>
                            <Label for="title">Entry Title: </Label>
                            <Input type="text"
                                name="title"
                                id="title"
                                placeholder="Enter the title of your entry"
                                onChange={this.handleFieldChange}
                                required
                                />
                        </FormGroup>
                        <FormGroup>
                            <Label for="entry">Entry: </Label>
                            <Input type="textarea"
                                name="entry"
                                id="entry"
                                placeholder="Enter some text to analyze"
                                onChange={this.handleFieldChange}
                                required
                                />
                        </FormGroup>
                        <Button>Analyze</Button>
                    </Form>
                </CardBody>
            </Card>
        )
    }
}