import React, {Component} from "react"

import EditResults from "./EditResults"
import entryData from "../../modules/entryData"

import { Card, CardHeader, CardTitle, CardText, Button, CardBody, ButtonGroup } from "reactstrap"
import "./results.css"

export default class Results extends Component {

    state = {
        editButtonClicked: false
    }

//     componentDidMount() {
//         if(sessionStorage.getItem("currentEntryID")){
//             return entryData.getCurrentEntry(sessionStorage.getItem("currentEntryID"))
//          .then(currentEntry => {
//             this.setState({
//              body: currentEntry.body,
//              title: currentEntry.title,
//              }) 
//          }) 
//     }
// }

    handleDelete = () => {

        this.props.onDelete(sessionStorage.getItem("currentEntryID"))
        // .then(() => sessionStorage.removeItem("currentEntryID"))
        .then(() => this.props.history.push("/new-entry"))
    }

    handleEdit = () => {
        this.setState({
            editButtonClicked: true
        })
    }

    savingEditedEntry = (edit) => {
        
        this.props.saveEditedEntry(edit)

        this.setState({
            editButtonClicked: false
        })
    }

    goBackToResults = () => {
        this.setState({
            editButtonClicked: false
        })
    }

    handleFindSynonyms = () => {
        this.props.history.push("/synonyms")
    }


    render() {
        return (
            <Card>
                <CardHeader>Results</CardHeader>
                <CardBody className="resultsBody">
                    
                            { this.state.editButtonClicked ?
                            
                            <React.Fragment>
                                <Card className="resultsEntry-edit">
                                    <CardBody className="resultsEntry-body"> 
                                        <EditResults
                                        onSave = {this.savingEditedEntry}
                                        body={this.props.body}
                                        title={this.props.title}
                                        goBack={this.goBackToResults}
                                        />
                                    </CardBody>
                                </Card>
                            </React.Fragment>
                           
                             
                            :

                            <React.Fragment>
                                
                                <Card className="resultsEntry">
                                    <CardBody>
                                        <CardTitle>{this.props.title}</CardTitle>
                                        <CardText>{this.props.body}</CardText>  
                                    </CardBody>
                                </Card>
                                <div className="resultsBody-right">
                                    <Card className="resultsAnalysis">
                                        <CardBody>
                                            <CardTitle>Analysis</CardTitle>
                                            <CardText>The readability level is casual</CardText>
                                            <CardText>The highest scoring word is: </CardText>
                                        </CardBody>
                                    </Card>
                                    <Card>
                                        <CardBody>
                                            <ButtonGroup className="resultsButtons">
                                                <Button
                                                onClick={this.handleFindSynonyms}
                                                >Find Synonyms</Button>
                                                <Button onClick={this.handleEdit}>Edit Entry</Button>
                                                <Button onClick={this.handleDelete}
                                                >Discard Entry</Button>
                                            </ButtonGroup>
                                        </CardBody>
                                    </Card>
                                    </div>

                            </React.Fragment> 
                            }
                            
                        
                    
                </CardBody>
            </Card>
        )
    }
}