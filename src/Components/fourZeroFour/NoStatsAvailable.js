// Author: Chris Morgan / May 2019

// This is a PureComponent because it doesn't require any updating to render properly.

// react imports
import React, { PureComponent } from "react"

// reactstrap imports
import { Card, CardHeader, Button, CardText, CardBody, CardFooter } from "reactstrap"

// stylesheet import
import "./fourZeroFour.css"

export default class NoStatsAvailable extends PureComponent {

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
                        We couldn't find any saved entries for your account. Please submit an entry to analyze. Saved entries can be viewed on the Stats page.
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