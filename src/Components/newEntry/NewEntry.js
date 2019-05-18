// Author: Chris Morgan / May 2019

// The NewEntry component is responsible for rendering the new entry form of the application. The form will grab user input, calculate the word score, and make a POST to the database.

// react imports
import React, {Component} from "react"

// reactstrap imports
import { Card, CardBody, CardHeader,  Button, Form, FormGroup, Label, Input, Badge, CardSubtitle } from "reactstrap"

// module imports
import entryData from "../../modules/entryData"
import scoreAPI from "../../modules/scoreAPI"
import cache from "../../modules/cache"
import filtering from "../../modules/filter"

// stylesheet imports
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

    // When the component unmounts, the application will create an array with each word of the entry becoming an array item and removing punctuation and weak words. Then the cache.locStr function is called which makes a fetch call to the TwinWord language scoring API for each word. This array of promises is stored in localStorage

    componentWillUnmount() {
       
        const wordArray = filtering.getRidOfPunctuation(this.state.body)

        let filteredArray = filtering.filterOutWeakWords(wordArray)

        cache.locStr(filteredArray)
    }

    // This function is responsible for determining which score group the entry will belong to.

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

    // This function makes sure there is no entry currrently saved in sessionStorage. Then it will make sure an entry with this title doesn't already exist. If not, it will create an entryObj with the title, body, userID, and the scoreGroup which is found after submission.

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


                let entryObj = {
                    title: this.state.title,
                    body: this.state.body,
                    userId: Number(sessionStorage.getItem("userID")),
                    scoreGroup: ""
                }
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
                <CardHeader className="bg-dark text-white text-center">
                    <h1>
                        <Badge color="dark"
                        className="heading">
                        Create a New Entry
                        </Badge>
                    </h1>
                    <CardSubtitle className="text-white newEntrySub">
                       Insert some text to analyze. Titles must be unique.
                    </CardSubtitle>
                </CardHeader>
                <CardBody className="bg-light">
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