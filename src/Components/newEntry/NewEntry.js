import React, {Component} from "react"

import entryData from "../../modules/entryData"
import scoreAPI from "../../modules/scoreAPI"

import cache from "../../modules/cache"
import filtering from "../../modules/filter"

import { Card, CardBody, CardHeader, CardTitle, Button, Form, FormGroup, Label, Input, Badge } from "reactstrap"
import "./newEntry.css"



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

    componentWillUnmount() {
       
            const wordArray = filtering.getRidOfPunctuation(this.state.body)
            let filteredArray = filtering.filterOutWeakWords(wordArray)
            cache.locStr(filteredArray)
           
        
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
        if(sessionStorage.getItem("currentEntryID")){
            sessionStorage.removeItem("currentEntryID")
        }
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
                    scoreGroup: ""
                }
                debugger
                return scoreAPI.getAverageVocabScoreNOSAVE(this.state.body).then(response => entryObj.avgScore = response.ten_degree)

                .then(() => scoreAPI.getAverageVocabScoreNOSAVE(this.state.body))

                .then(response => response.ten_degree)
                
                .then(response => entryObj.scoreGroup = this.indentifyScoreGroup(response)[1])

                .then(() => this.props.onAnalyze(entryObj))
                .then(() => this.props.history.push("/results"))
                }
            })
    }

    render() {
        return (
            <Card className="mr-3 ml-3 mt-3">
                <CardHeader className="bg-secondary text-white text-center">
                    <h1>
                        <Badge>
                        Create a New Entry
                        </Badge>
                    </h1>
                </CardHeader>
                <CardBody className="bg-light">
                    <CardTitle>Insert your entry and its title here. Click the "Analyze" button for text-analysis to begin.</CardTitle>
                    <Form className="newEntryForm"
                     onSubmit={this.handleAnalyze}>
                        <FormGroup className="newEntryTitle">
                            <Label for="title">Entry Title: </Label>
                            <Input type="text"
                                name="title"
                                id="title"
                                placeholder="Enter the title of your entry"
                                onChange={this.handleFieldChange}
                                required
                                />
                        </FormGroup>
                        <FormGroup className="newEntryAreaGroup">
                            <Label for="entry">Entry: </Label>
                            <Input type="textarea"
                                name="entry"
                                id="body"
                                className="newEntryTextarea"
                                placeholder="Enter some text to analyze"
                                onChange={this.handleFieldChange}
                                required
                                />
                        </FormGroup>
                        <Button className="mt-2 analyzeButton"
                        color="dark"
                        block={true}
                        >Analyze</Button>
                    </Form>
                </CardBody>
            </Card>
        )
    }
}