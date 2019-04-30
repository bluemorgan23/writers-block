import React, {Component} from "react"

import entryData from "../../modules/entryData"

import { Card, CardBody, CardHeader, CardTitle, Button, Form, FormGroup, Label, Input } from "reactstrap"


export default class NewEntry extends Component {
    
    state = {
        title: "",
        body: "",
    }

    handleFieldChange = (event) => {
        let stateToChange = {}
        stateToChange[event.target.id] = event.target.value
        this.setState(stateToChange)
    }

    handleAnalyze = (event) => {
        event.preventDefault()
        entryData.getUserEntries()
        .then(entryList => {
            return entryList.find(entry => entry.title.toLowerCase() === this.state.title.toLowerCase())
        })

        .then(matchedTitle => {
            if(matchedTitle){

                return window.alert("An entry with this title already exists for your account! Please use another title.")

            } else {
                
                let entryObj = {
                    title: this.state.title,
                    body: this.state.body,
                    userId: Number(sessionStorage.getItem("userID"))
                }
                 
                return this.props.onAnalyze(entryObj)

                    .then(() => entryData.getUserEntries())
                    .then(entries => {
                            return entries.find(entry => entry.title.toLowerCase() === this.state.title.toLowerCase())
                            })
                    .then(matchedEntry => {
                        this.props.history.push("/results")
                        sessionStorage.setItem("currentEntryID", matchedEntry.id)
                    })
                }
            })
    }

    render() {
        return (
            <Card>
                <CardHeader>Create a New Entry</CardHeader>
                <CardBody>
                    <CardTitle>Insert your entry and its title here. Click the "Analyze" button for text-analysis to begin.</CardTitle>
                    <Form onSubmit={this.handleAnalyze}>
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
                                id="body"
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