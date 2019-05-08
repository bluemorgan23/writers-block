import React, {Component} from "react"

import entryData from "../../modules/entryData"

import { Card, CardHeader, CardTitle, CardBody, CardText, CardLink, Button, ListGroup, ListGroupItem, Container, Row, Col, CardSubtitle } from "reactstrap"
import "./stats.css"

import { GiEnlightenment, GiCrown, GiBrain } from "react-icons/gi"
import { IoIosBowtie } from "react-icons/io"

export default class Stats extends Component {

    state = {
        currentUserEntries: [],
    }

    componentDidMount() {
        entryData.getUserEntries()
        .then(response => this.setState({
            currentUserEntries: response
        }))
    }

    componentWillUnmount() {
        this.setState({
            currentUserEntries: []
        })
    }

    whichIconToUse = (score) => {
        switch(true) {
            case(score < 3):
                return <GiEnlightenment size="2em" color="#843131"/>
            case(score > 2 && score < 5):
                return <IoIosBowtie size="2em"/>
            case(score > 4 && score < 7):
                return <GiCrown size="2em" color="#d1a849"/>
            case(score > 6 && score < 11):
                return <GiBrain size="2em" color="#ba5e77"/>
        }
    }

    handleDiscard = (event) => {
        
        this.props.delete(Number(event.target.id))
        .then(() => entryData.getUserEntries())
        .then(response => this.setState({
            currentUserEntries: response
        }))
    }


    onLinkClick = (event) => {
        sessionStorage.setItem("currentEntryID", event.target.id)
        localStorage.clear()
    } 

    render() {
        return (
           <Card className="text-center">
            <CardHeader>Saved Entries</CardHeader>
            <CardBody>
                <CardTitle>Click on an entry title to view the results.</CardTitle>
                <CardSubtitle></CardSubtitle>
                <hr></hr>
                <Container>
                    <Col>
                {
                    this.state.currentUserEntries.map(entry => {
                           
                            return  <ListGroup className="statsContainer mb-3" key={entry.id}>
                                        <Row className="statsRow">
                                            <ListGroupItem key={entry.id}className="statsListItem">
                                            
                                                <Col>
                                                <CardLink
                                                    id={entry.id} 
                                                    href={`/results`}
                                                    onClick={this.onLinkClick}
                                                    >{entry.title}
                                                </CardLink>
                                                </Col>
                                                <Col>
                                                <CardText>
                                                {this.whichIconToUse(entry.avgScore)}
                                                </CardText>
                                                </Col>
                                                <Col>
                                                <small className="text-muted">last update: </small>
                                                </Col>
                                                <Col>
                                                <Button className="discardStat text-center"
                                                size="sm"
                                                color="danger"
                                                onClick={this.handleDiscard}
                                                id={entry.id}>X</Button>
                                                </Col>
                                            
                                            </ListGroupItem>
                                            </Row>
                                    </ListGroup>
                                
                        })
                    
                }
                    </Col>
                </Container>
            </CardBody>
         </Card> 
        )
        
    }
}