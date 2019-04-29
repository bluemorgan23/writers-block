import React, {Component} from "react"

import { Card, CardHeader, CardTitle, CardText, Button, CardBody, ButtonGroup } from "reactstrap"

export default class Results extends Component {



    render() {
        return (
            <Card>
                <CardHeader>Results</CardHeader>
                <CardBody className="resultsBody">
                    <Card>
                        <CardBody>
                            <CardTitle>{this.props.title}</CardTitle>
                            <CardText>{this.props.body}</CardText>
                        </CardBody>
                    </Card>
                    <div className="resultsBody-right">
                        <Card>
                            <CardBody>
                                <CardTitle>Analysis</CardTitle>
                                <CardText>The readability level is casual</CardText>
                            </CardBody>
                        </Card>
                        <Card>
                            <CardBody>
                                <ButtonGroup className="resultsButtons">
                                    <Button>Find Synonyms</Button>
                                    <Button>Edit Entry</Button>
                                    <Button>Discard Entry</Button>
                                </ButtonGroup>
                            </CardBody>
                        </Card>
                    </div>
                </CardBody>
            </Card>
        )
    }
}