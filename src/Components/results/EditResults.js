// Author: Chris Morgan / May 2019

// The purpose of the EditResults component is to provide the user with the affordance of editing their submitted entry on the results page. When the user clicks Edit on the Results page, this component is responsible for rendering the edit form with the title and entry body text prefilled in the input fields.

// react imports
import React, {Component} from "react"

// reactstrap imports
import {Form, FormGroup, Input, Label, Button } from "reactstrap"

// module imports
import scoreAPI from "../../modules/scoreAPI";

// stylesheet imports
import "./results.css"

export default class EditResults extends Component {

    state = {

        body: "",
        title: ""
    }

    // Grab the body and title from props, this is how the form is prefilled with the text.

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

    // Which score group does the text belong to? This is necessary for when the user submits an edited entry and the score is reanalyzed. This will be the value that will be used in a PUT request to update the scoreGroup value in the JSON database.

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

     // Asynchronious function that is attached to the save edit button. The function takes the event as an argument. The submit default is prevented. Then the edit object is created with the saved values in session storage. The body and title values are grabbed from the local state which updates as the user changes the text. Then a fetch call is made to the TwinWord API to determine any change in score. This calculated value is attached as the average score, and the score group is updated as well. The onSave function is passed down as props from Application views.

    handleSave = async (event) => {
        event.preventDefault()

        let edit = {

            id: Number(sessionStorage.getItem("currentEntryID")),
            userId: Number(sessionStorage.getItem("userID")),
            body: this.state.body,
            title: this.state.title

        }

        let promise = scoreAPI.getAverageVocabScoreNOSAVE(this.state.body)

        let score = await promise

        edit.avgScore = await score.ten_degree

        edit.scoreGroup = await this.indentifyScoreGroup(score.ten_degree)[1]
        
        this.props.onSave(await edit)
    }

    // Back button => return the user to the results screen and don't save any changes.

    handleGoBack = (event) => {

        event.preventDefault()

        this.props.goBack();
    }

    render() {
        // Edit form rendering
        return (

          <React.Fragment>

            <Form className="editForm-results">

                <FormGroup className="editForm-group">
                    <Label for="title">Entry Title: </Label>
                    <Input 
                        type="text"
                        id="title"
                        name="title"
                        onChange={this.handleFieldChange}
                        value={this.state.title}
                    />
                </FormGroup>

                <FormGroup className="editForm-group">
                    <Label for="body">Entry: </Label>
                    <Input 
                        type="textarea"
                        id="body"
                        name="body"
                        onChange={this.handleFieldChange}
                        value={this.state.body}
                        className="editTextarea"
                    />
                </FormGroup>

                <div className="editFormButtons">
                    <Button color="dark"
                    onClick={this.handleSave}>Save Edits</Button>
                    <Button className="ml-1"
                    color="danger"
                    onClick={this.handleGoBack}>Discard Edits</Button> 
                </div>

            </Form>

        </React.Fragment>  
        )
        
    }
}