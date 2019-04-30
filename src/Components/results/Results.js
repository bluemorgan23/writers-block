import React, {Component} from "react"

import EditResults from "./EditResults"

import { Card, CardHeader, CardTitle, CardText, Button, CardBody, ButtonGroup } from "reactstrap"
import "./results.css"

export default class Results extends Component {

    state = {
        editButtonClicked: false
    }

    handleDelete = (event) => {
        this.props.onDelete(sessionStorage.getItem("currentEntryID"))
        .then(() => sessionStorage.removeItem("currentEntryID"))
    }

    handleEdit = () => {
        this.setState({
            editButtonClicked: true
        })
    }

    render() {
        return (
            <Card>
                <CardHeader>Results</CardHeader>
                <CardBody className="resultsBody">
                    <Card className="resultsEntry">
                        <CardBody>
                            { this.state.editButtonClicked ? 
                            
                            <EditResults 
                            body={this.props.body}
                            title={this.props.title} />
                             
                            :

                            <React.Fragment>
                                <CardTitle>{this.props.title}</CardTitle>
                                <CardText>{this.props.body}</CardText> 
                            </React.Fragment> 
                            }
                            
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
                                    <Button>Find Synonyms</Button>
                                    <Button onClick={this.handleEdit}>Edit Entry</Button>
                                    <Button onClick={this.handleDelete}
                                    >Discard Entry</Button>
                                </ButtonGroup>
                            </CardBody>
                        </Card>
                    </div>
                </CardBody>
            </Card>
        )
    }
}