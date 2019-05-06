import React, {Component} from "react"



import EditResults from "./EditResults"
import cache from "../../modules/cache"
import filtering from "../../modules/filter"
import synAPI from "../../modules/synAPI"
import entryData from "../../modules/entryData"
import Loading from "../loading/Loading"

import { Card, CardHeader, CardTitle, CardText, Button, CardBody, ButtonGroup } from "reactstrap"
import "./results.css"



export default class Results extends Component {

    state = {
        editButtonClicked: false,
        averageScore: 0,
        scoreGroup: "",
        isLoading: false,
        sentencesAndWords: []
    }

    componentDidMount() {
        console.log("mount")
        let idToGrab = Number(sessionStorage.getItem("currentEntryID"))
      if(idToGrab){
            entryData.getCurrentEntry(idToGrab)
            .then(response => filtering.getRidOfPunctuation(response.body))
            .then(wordArray => filtering.filterOutWeakWords(wordArray))
            .then(response => cache.locStr(response))
      }
    }

   switchToSyns = () => {
        this.setState({
           isLoading: !this.state.isLoading
       })
   }

  
    handleDelete = () => {

        this.props.onDelete(sessionStorage.getItem("currentEntryID"))
        .then(() => this.props.history.push("/new-entry"))
    }

    handleEdit = () => {
        this.setState({
            editButtonClicked: !this.state.editButtonClicked
        })
    }

    savingEditedEntry = (edit) => {
        
        this.props.saveEditedEntry(edit)

        this.setState({
            editButtonClicked: false
        })
    }

    

    render() {
        if(this.state.isLoading){
            return <Loading
            sentenceArray={this.props.sentenceArray} 
            entry={this.props.body}
            updateSentence={this.props.updateSentence}
            updateEntry={this.props.updateEntry}
            avgScore={this.props.avgScore}
            history={this.props.history}
            grabData={this.props.grabData}
            />
            }
        return (
            <Card>
                <CardHeader>Results</CardHeader>
                <CardBody className="resultsBody">
                    
                            { this.state.editButtonClicked ?
                            
                            <React.Fragment>
                                <Card className="resultsEntry-edit">
                                    <CardBody className="resultsEntry-body"> 
                                        <EditResults
                                        onSave = {this.savingEditedEntry}
                                        body={this.props.body}
                                        title={this.props.title}
                                        goBack={this.handleEdit}
                                        averageScore={this.props.avgScore}
                                        scoreGroup={this.props.scoreGroup}
                                        scoreGroupId={this.props.scoreGroupId}
                                        />
                                    </CardBody>
                                </Card>
                            </React.Fragment>
                           
                             
                            :

                            <React.Fragment>
                                
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
                                             
                                            <CardText>Average Score: {this.props.avgScore}
                            
                                            </CardText>
                                            <CardText>The readability grade of this entry is {this.props.scoreGroup}
                            
                                            </CardText>
                                            {/* <CardText>The highest scoring word is: </CardText> */}
                                            
                                        </CardBody>
                                    </Card>
                                    <Card>
                                        <CardBody>
                                            <ButtonGroup className="resultsButtons">
                                                <Button
                                                onClick={this.switchToSyns}
                                                >Find Synonyms</Button>
                                                <Button onClick={this.handleEdit}>Edit Entry</Button>
                                                <Button onClick={this.handleDelete}
                                                >Discard Entry</Button>
                                            </ButtonGroup>
                                        </CardBody>
                                    </Card>
                                    </div>

                            </React.Fragment> 
                            }
                            
                        
                    
                </CardBody>
            </Card>
        )
    }
}