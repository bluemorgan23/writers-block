import React, {Component} from "react"

import entryData from "../../modules/entryData"

import { Card, CardHeader, CardTitle, CardBody, CardText, CardLink, Button, ListGroup, ListGroupItem, Container, Row, Col, CardSubtitle, Badge } from "reactstrap"
import "./stats.css"

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
           <Card>
            <CardHeader>User Statistics</CardHeader>
            <CardBody>
                <CardTitle>Click on an entry title to view the results.</CardTitle>
                <hr></hr>
                <Container>
                    <Col>
                {
                    this.state.currentUserEntries.map(entry => {
                           
                            return  <ListGroup className="statsContainer mb-3" key={entry.id}>
                                        <Row className="statsRow">
                                            <ListGroupItem className="statsListItem">
                                            
                                                <Col>
                                                <CardLink
                                                    id={entry.id} 
                                                    href={`/results`}
                                                    onClick={this.onLinkClick}
                                                    >{entry.title}
                                                </CardLink>
                                                </Col>
                                           
                                            
                                                <Col>
                                                <CardText>Average Score</CardText>
                                                </Col>
                                                <Col>
                                                <small text-muted>last update: </small>
                                                </Col>
                                                <Col>
                                                <Badge className="discardStat text-center"
                                                size="sm"
                                                color="danger"
                                                onClick={this.handleDiscard}
                                                id={entry.id}>X</Badge>
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