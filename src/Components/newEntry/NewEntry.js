import React, {Component} from "react"

import entryData from "../../modules/entryData"
import scoreAPI from "../../modules/scoreAPI"

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

    indentifyScoreGroup = (score) => {
       
       if(score <= 2) {
           return [1, "Casual"]
       } else if(score <= 4 && score > 2) {
           return [2, "Business Formal"]
       } else if (score <= 6 && score > 4) {
           return [3, "Complex"]
       } else if (score <= 10 && score > 6) {
           return [4, "Semantic Genius"]
       }
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

                // let averageScore = scoreAPI.getAverageVocabScoreNOSAVE(this.state.body)
                

                let entryObj = {
                    title: this.state.title,
                    body: this.state.body,
                    userId: Number(sessionStorage.getItem("userID")),
                    scoreGroupId: 0,
                    avgScore: 1 ,
                    scoreGroup: ""
                }

                return scoreAPI.getAverageVocabScoreNOSAVE(this.state.body).then(response => entryObj.avgScore = response.ten_degree)
                .then(() => scoreAPI.getAverageVocabScoreNOSAVE(this.state.body))
                .then(response => response.ten_degree)
                .then(response => entryObj.scoreGroupId = this.indentifyScoreGroup(response)[0])
                .then(() => scoreAPI.getAverageVocabScoreNOSAVE(this.state.body))
                .then(response => response.ten_degree)
                .then(response => entryObj.scoreGroup = this.indentifyScoreGroup(response)[1])
                .then(() => this.props.onAnalyze(entryObj))


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