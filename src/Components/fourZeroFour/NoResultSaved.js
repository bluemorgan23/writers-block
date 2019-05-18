// Author: Chris Morgan / May 2019

// The NoResults PureComponent is simply an error message that is meant to be shown to the user if he/she tries to view results without submitting a new entry or selecting a saved entry from the Stats component. This prevents the user from seeing a blank results screen.

// This is a PureComponent because it doesn't require any updating to render properly.


// react imports
import React, { PureComponent } from "react"

// reactstrap imports
import { Card, CardHeader, Button, CardText, CardBody, CardFooter } from "reactstrap"

// stylesheet import
import "./fourZeroFour.css"

export default class NoResults extends PureComponent {

    render() {
        return (
            <Card className="noResults mt-4 bg-light">
                <CardHeader className="bg-danger text-center">
                    <h1 className="text-white subHeader">
                        
                            Sorry!
                        
                    </h1>
                </CardHeader>
                <CardBody>
                    <CardText className="errorMessage">
                        We couldn't find any text to analyze. Please submit a new entry to view this section. To view results for one of your saved entries, head over to your Stats list and select an entry to analyze by clicking the title.
                    </CardText>
                </CardBody>
                <CardFooter className="text-center">
                {/* onClick => send user to create a new entry */}
                    <Button className="errBtn"
                    color="dark"
                    onClick={() => this.props.history.push("/new-entry")}>
                        Create New Entry
                    </Button>
                </CardFooter>
            </Card>
        )
    }
}