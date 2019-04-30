import React, {Component} from "react"

import { Card, CardHeader, CardTitle, CardText, Button, CardBody, ButtonGroup } from "reactstrap"
import "./results.css"

export default class Results extends Component {

    handleDelete = (event) => {
        this.props.onDelete(sessionStorage.getItem("currentEntryID"))
        .then(() => sessionStorage.removeItem("currentEntryID"))
    }

    render() {
        return (
            <Card>
                <CardHeader>Results</CardHeader>
                <CardBody className="resultsBody">
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
                                    <Button>Find Synonyms</Button>
                                    <Button>Edit Entry</Button>
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