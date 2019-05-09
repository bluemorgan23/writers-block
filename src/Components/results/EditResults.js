import React, {Component} from "react"

import ScoreAPI from "../../modules/scoreAPI"
import {Form, FormGroup, Input, Label, Button, ButtonGroup} from "reactstrap"

import "./results.css"
import scoreAPI from "../../modules/scoreAPI";

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


    handleSave = async (event) => {
        event.preventDefault()
        let edit = {
            id: Number(sessionStorage.getItem("currentEntryID")),
            userId: Number(sessionStorage.getItem("userID")),
            body: this.state.body,
            title: this.state.title
            // scoreGroup: this.props.scoreGroup,
            // avgScore: this.props.averageScore
        }
        let promise = scoreAPI.getAverageVocabScoreNOSAVE(this.state.body)

        let score = await promise

        edit.avgScore = await score.ten_degree

        edit.scoreGroup = await this.indentifyScoreGroup(score.ten_degree)[1]
        
        this.props.onSave(await edit)
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