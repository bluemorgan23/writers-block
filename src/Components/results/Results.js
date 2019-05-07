import React, {Component} from "react"



import EditResults from "./EditResults"
import cache from "../../modules/cache"
import filtering from "../../modules/filter"
import synAPI from "../../modules/synAPI"
import entryData from "../../modules/entryData"
import Loading from "../loading/Loading"

//icons 
import { GiEnlightenment } from "react-icons/gi"
import { IoIosBowtie } from "react-icons/io"
import { GiCrown } from "react-icons/gi"
import { GiBrain } from "react-icons/gi"

import { Card, CardHeader, CardTitle, CardText, Button, CardBody, ButtonGroup, Container, Row, Col, Badge } from "reactstrap"
import "./results.css"



export default class Results extends Component {

    state = {
        editButtonClicked: false,
        averageScore: 0,
        scoreGroup: "",
        isLoading: false,
        sentencesAndWords: []
    }

    componentDidMount = async() => {
        
        let idToGrab = Number(sessionStorage.getItem("currentEntryID"))
            if(idToGrab){

                const response = entryData.getCurrentEntry(idToGrab)

                const json = await response
            
                const wordArray = await filtering.getRidOfPunctuation(json.body)

           
                const newArray = await filtering.filterOutWeakWords(wordArray)

                this.setState({averageScore: await json.avgScore, scoreGroup: await json.scoreGroup})

                cache.locStr(newArray)
        }
    }

    whichIconToUse = (score) => {
        switch(true) {
            case(score < 3):
                return <GiEnlightenment />
            case(score > 2 && score < 5):
                return <IoIosBowtie />
            case(score > 4 && score < 7):
                return <IoIosBowtie />
            case(score > 6 && score < 11):
                return <IoIosBowtie />
        }
    }

    // shouldComponentUpdate(prevState) {
    //     if(this.state.isLoading !== prevState.isLoading){
    //         return true
    //     }
    //     else{
    //         return false
    //     }
    // }

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
            } else {
        return (
            <Container className="resultsContainer" fluid >
            <Card className="mt-3">
                <CardHeader>
                    <h1 className="resultsTitle">
                        <Badge >
                           Results 
                        </Badge>
                    </h1>
                </CardHeader>
                <CardBody className="resultsBody bg-secondary">
                    
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
                                <Row>
                                <Col>
                                <Card
                                className="resultsEntry">
                                    <CardBody>
                                        <CardTitle>
                                            <h4>
                                                <Badge color="primary">
                                                   {this.props.title} 
                                                </Badge>
                                            </h4>
                                        </CardTitle>
                                        <CardText>{this.props.body}</CardText>  
                                    </CardBody>
                                </Card>
                                </Col>
                                </Row>
                                <Row className="mt-3">
                                <Col className="resultsBody-right">
                                    <Card className="resultsAnalysis">
                                        <CardHeader className="bg-light">
                                            <h1 className="resultsTitle">
                                                <Badge color="secondary">
                                                    Analysis
                                                </Badge>
                                            </h1>
                                        </CardHeader>
                                        <CardBody>
                                           
                                            <CardText>Average Score: {this.props.avgScore}
                            
                                            </CardText>
                                            <CardText>The readability grade of this entry is {this.props.scoreGroup}
                            
                                            </CardText>
                                            {this.whichIconToUse(this.props.avgScore)}
                                            
                                        </CardBody>
                                    </Card>
                                    <Card className="rightBottom-card">
                                    <CardHeader >
                                        <h1 className="resultsTitle"
                                        id="">
                                        <Badge >
                                        Editor
                                        </Badge>
                                        </h1>
                                        </CardHeader>
                                        <CardBody className="buttonGroup-results">
                                            <ButtonGroup vertical={true}
                                             size="lg"
                                            className="resultsButtons">
                                                <Button 
                                                size="lg"
                                                color="info"
                                                block
                                                onClick={this.switchToSyns}
                                                >Find Synonyms</Button>
                                                <Button 
                                                size="lg"
                                                className="mt-1"
                                                block
                                                color="info"
                                                 onClick={this.handleEdit}>Edit Entry</Button>
                                                <Button size="lg"
                                                className="mt-1"
                                                block
                                                color="danger"
                                                onClick={this.handleDelete}
                                                >Discard Entry</Button>
                                            </ButtonGroup>
                                        </CardBody>
                                    </Card>
                                    </Col>
                                    </Row>
                            </React.Fragment> 
                            }
                            
                        
                    
                </CardBody>
                </Card>
            </Container>
        )}
    }
}