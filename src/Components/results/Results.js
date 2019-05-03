import React, {Component} from "react"

import EditResults from "./EditResults"
import entryData from "../../modules/entryData"
import scoreAPI from "../../modules/scoreAPI"

import { Card, CardHeader, CardTitle, CardText, Button, CardBody, ButtonGroup } from "reactstrap"
import "./results.css"

export default class Results extends Component {

    state = {
        editButtonClicked: false,
        averageScore: 0,
        scoreGroup: ""
    }

    // static getDerivedStateFromProps(props) {
    //     this.setState({
    //         averageScore: props.avgScore,
    //         body: 
    //     })
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
                                        averageScore={this.props.avgScore}
                                        scoreGroup={this.props.scoreGroup}
                                        scoreGroupId={this.props.scoreGroupId}
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
                                             
                                            <CardText>Average Score: {this.props.avgScore}
                            
                                            </CardText>
                                            <CardText>The readability grade of this entry is {this.props.scoreGroup}
                            
                                            </CardText>
                                            {/* <CardText>The highest scoring word is: </CardText> */}
                                            
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