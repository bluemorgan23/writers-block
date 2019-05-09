import React, { PureComponent } from "react"

import { Card, CardHeader, Button, CardText, CardBody, CardFooter } from "reactstrap"

import "./fourZeroFour.css"

export default class NoResults extends PureComponent {

    render() {
        return (
            <Card className="noResults mt-4 bg-light">
                <CardHeader className="bg-danger text-center">
                    <h1 className="text-white">
                        
                            Sorry!
                        
                    </h1>
                </CardHeader>
                <CardBody>
                    <CardText className="errorMessage">
                        We couldn't find any text to analyze. Please submit a new entry to view this section. To view results for one of your saved entries, head over to your Stats list and select an entry to analyze by clicking the title.
                    </CardText>
                </CardBody>
                <CardFooter>
                    <Button onClick={() => this.props.history.push("/new-entry")}>
                        Create New Entry
                    </Button>
                </CardFooter>
            </Card>
        )
    }
}