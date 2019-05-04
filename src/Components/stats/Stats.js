import React, {Component} from "react"

import entryData from "../../modules/entryData"

import { Card, CardHeader, CardTitle, CardBody, CardText, CardLink, Button } from "reactstrap"
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
        localStorage.removeItem("eachScore")
    } 

    render() {
        return (
           <Card>
            <CardHeader>User Statistics</CardHeader>
            <CardBody>
                <CardTitle>Click on an entry title to view the results.</CardTitle>
                <hr></hr>
                {
                    this.state.currentUserEntries.map(entry => {
                           
                            return  <div className="statsContainer mb-3" key={entry.id}>
                                        <CardLink 
                                            id={entry.id} 
                                            href={`/results/${entry.id}`}
                                            onClick={this.onLinkClick}
                                            >{entry.title}
                                        </CardLink>
                                        <CardText>Average Score</CardText>
                                        <CardText>Date: 09/27/1994</CardText>
                                        <Button 
                                        onClick={this.handleDiscard}
                                        id={entry.id}>Discard Entry</Button> 
                                    </div>   
                        })
                    
                }
            </CardBody>
        </Card> 
        )
        
    }
}