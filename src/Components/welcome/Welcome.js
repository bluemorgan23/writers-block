import React, {PureComponent} from "react"

import { Card, CardBody, CardText, CardHeader, CardTitle, Button, Badge, ListGroup, ListGroupItem } from "reactstrap"

import {GiCrown, GiBrain, GiEnlightenment } from "react-icons/gi"
import {IoIosBowtie} from "react-icons/io"

import "./welcome.css"

export default class Welcome extends PureComponent {


    render() {
        return (
            <Card className="welcomeCard mt-3">
                <CardHeader className="bg-dark">
                    <CardTitle className="welcomeHeading text-center">
                        <h1>
                            <Badge
                            color="dark">
                                Thanks for Using The Writer's Block!
                            </Badge>
                        </h1>
                    </CardTitle>
                </CardHeader>
                <CardBody className="bg-light text-center">
                    <CardTitle className="subWelcome">
                        Here's a quick tutorial before you get started!
                    </CardTitle>
                    <CardText>
                        The Writer's Block is a great editing tool for all writers. To use the application, you must enter a group of text into the New Entry Form. Once you submit an entry, the application will analyze your words and calculate which score group you belong to.
                    </CardText>
                    <CardText>Here are the score groups: </CardText>
                    <ListGroup>
                    <ListGroupItem>
                        <GiEnlightenment size="3em" color="#843131"/> = {" "}
                        <b>
                           Casual
                        </b>
                    </ListGroupItem>
                    <ListGroupItem>
                        <IoIosBowtie size="3em" /> = {" "}
                        <b>
                           Business 
                        </b>
                    </ListGroupItem>
                    <ListGroupItem>
                        <GiCrown size="3em" color="#d1a849"/> = {" "}
                        <b>
                           Complex 
                        </b>
                    </ListGroupItem>
                    <ListGroupItem>
                        <GiBrain size="3em" color="#ba5e77"/> = {" "}
                        <b>
                          Semantic Genius  
                        </b>
                    </ListGroupItem>
                    </ListGroup>
                    <CardText className="mt-2">
                        Once you have seen your results, you will have the option to either edit, delete, or find synonyms for some of the words. Once you click find synonyms, you will be presented with the Synonym Finder. Here, you will be able to select from a choice of synonyms to replace certain words within your text. Once you are finished, you can return to results to view your updated score. 
                    </CardText>
                    <CardText>
                        Click the button below to continue!
                    </CardText>
                    <Button size="lg"
                    className="welcomeContinue"
                    color="dark"
                    onClick={() => this.props.history.push("/new-entry")}
                    >Continue</Button>
                </CardBody>
            </Card>
        )
    }
}