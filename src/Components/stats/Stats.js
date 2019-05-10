import React, {Component} from "react"

import entryData from "../../modules/entryData"

import { Card, CardHeader, CardBody, CardText, CardLink, Button,CardSubtitle, CardDeck, Badge } from "reactstrap"
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
                return <GiEnlightenment size="3em" color="#843131"/>
            case(score > 2 && score < 5):
                return <IoIosBowtie size="3em"/>
            case(score > 4 && score < 7):
                return <GiCrown size="3em" color="#d1a849"/>
            case(score > 6 && score < 11):
                return <GiBrain size="3em" color="#ba5e77"/>
        }
    }

    handleDiscard = (event) => {

        const askUser = window.confirm("Are you sure you'd like to delete this entry?")

        if (askUser){
        
        this.props.delete(Number(event.target.id))
        .then(() => entryData.getUserEntries())
        .then(response => this.setState({
            currentUserEntries: response
        }))
        } else {
            return null
        }
    }


    onLinkClick = (event) => {
        sessionStorage.setItem("currentEntryID", event.target.id)
        localStorage.clear()
    } 

    render() {
        return (
           <Card className="text-center statsCard bg-light mt-3">
            <CardHeader className="bg-dark text-center">
                <h1>
                    <Badge color="dark"
                    className="heading">
                        Saved Entries
                    </Badge>
                </h1>
                <CardSubtitle className="text-white statsSub">
                    Click on an entry title to view the results.
                </CardSubtitle>
            </CardHeader>
            
            <CardBody className="bg-light">
                
                {
                    this.state.currentUserEntries.map(entry => {
                           
                            return  <CardDeck className="statsContainer mb-3" key={entry.id}>
                                        
                                            <Card key={entry.id}className="statsCards">
                                            
                                                <CardBody className="statsBody">
                                                    <CardLink
                                                       className="text-dark"
                                                        id={entry.id} 
                                                        href={`/results`}
                                                        onClick={this.onLinkClick}
                                                        >{entry.title}
                                                    </CardLink>
                                               
                                                
                                                
                                                    <CardText>
                                                    {this.whichIconToUse(entry.avgScore)}
                                                    </CardText>
                                                
                                                
                                                    
                                                    {/* <small className="text-muted">last update: </small>
                                                     */}
                                                    
                                                    <Button className="discardStat text-center"
                                                    size="sm"
                                                    color="danger"
                                                    onClick={this.handleDiscard}
                                                    id={entry.id}>X</Button>
                                                
                                                </CardBody>
                                            </Card>
                                            
                                    </CardDeck>
                                
                        })
                    
                }
                  
            </CardBody>
         </Card> 
        )
        
    }
}