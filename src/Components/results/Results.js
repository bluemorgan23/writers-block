import React, {Component} from "react"



import EditResults from "./EditResults"
import cache from "../../modules/cache"
import filtering from "../../modules/filter"

import entryData from "../../modules/entryData"
import LoadingSyns from "../loading/LoadingSyns"

//icons 
import { GiEnlightenment } from "react-icons/gi"
import { IoIosBowtie } from "react-icons/io"
import { GiCrown } from "react-icons/gi"
import { GiBrain } from "react-icons/gi"

import { Card, CardHeader, CardTitle, CardText, Button, CardBody, ButtonGroup, Container, Row, Col, Badge, CardDeck } from "reactstrap"
import "./results.css"
import LoadingScore from "../loading/LoadingScore";



export default class Results extends Component {

    state = {
        editButtonClicked: false,
        averageScore: 0,
        scoreGroup: "",
        isLoadingSyns: false,
        sentencesAndWords: [],
        isLoadingResults: true
    }

    static getDerivedStateFromProps(nextProps)  {
        if(nextProps.avgScore !== nextProps.averageScore){
    
            return {averageScore: nextProps.avgScore, scoreGroup: nextProps.scoreGroup}
        
        } 
        else {
            return null
        }
    }

    scoreLoadingChange = () => {
        return setTimeout(this.setState({isLoadingResults: false}), 2000)
    }

    componentDidMount = async() => {
        

        let idToGrab = Number(sessionStorage.getItem("currentEntryID"))
            if(idToGrab){

                const response = entryData.getCurrentEntry(idToGrab)

                const json = await response
            
                const wordArray = await filtering.getRidOfPunctuation(json.body)

           
                const newArray = await filtering.filterOutWeakWords(wordArray)


                cache.locStr(newArray)

        }
    }

    whichIconToUse = (score) => {
        let casual = <GiEnlightenment size="4em" color="#843131" />
        let biz = <IoIosBowtie size="4em"/>
        let complex = <GiCrown size="4em" color="#d1a849"/>
        let genius = <GiBrain size="4em" color="#ba5e77"/>
        switch(true) {
            case(score < 3):
                return [casual, "Casual"]
            case(score > 2 && score < 5):
                return [biz, "Business"]
            case(score > 4 && score < 7):
                return [complex, "Complex"]
            case(score > 6 && score < 11):
                return [genius, "Semantic Genius"]
        }
    }

   switchToSyns = () => {
        this.setState({
           isLoadingSyns: !this.state.isLoadingSyns
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

        if(this.state.isLoadingResults){
            return <LoadingScore
                    scoreLoadingChange={this.scoreLoadingChange}
                    isLoadingResults={this.state.isLoadingResults}
                    history={this.props.history}/>
        }

        else if(this.state.isLoadingSyns){
            return <LoadingSyns
            sentenceArray={this.props.sentenceArray} 
            entry={this.props.body}
            updateSentence={this.props.updateSentence}
            updateEntry={this.props.updateEntry}
            avgScore={this.props.avgScore}
            history={this.props.history}
            grabData={this.props.grabSynData}
            switchToSyns={this.switchToSyns}
            isLoading={this.state.isLoading}
            />
            } else {
        return (
            <Container className="resultsContainer" fluid >
            <Card className="mt-3">
                <CardHeader className="bg-secondary text-center">
                    <h1 className="resultsTitle">
                        <Badge >
                           Results 
                        </Badge>
                    </h1>
                </CardHeader>
                <CardBody className="resultsBody bg-light">
                    
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
                                
                              
                                
                                <Row className="entryRow">
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
                                </Row>
                               
                                
                               <Row>
                                <CardDeck className="mt-3 bottomGroup">
                                    <Card className="resultsAnalysis text-center">
                                        <CardHeader className="bg-secondary">
                                            <h1 className="resultsTitle">
                                                <Badge color="secondary">
                                                    Analysis
                                                </Badge>
                                            </h1>
                                        </CardHeader>
                                        <CardBody>
                                           <CardText>
                                            {(this.whichIconToUse(this.state.averageScore))[0]}
                                            </CardText>

                                            <CardText>
                                                 We calculate a {" "}
                                                <b>{(this.whichIconToUse(this.state.averageScore))[1]}
                                                </b>{" "}
                                                level of vocabulary based on your input.
                                                
                            
                                            </CardText>
                                            
                                           
                                        </CardBody>
                                    </Card>
                                    <Card className="rightBottom-card">
                                    <CardHeader className="bg-secondary text-center">
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
                                    
                                   </CardDeck>
                                   </Row>
                            </React.Fragment> 
                            }
                            
                        
                    
                </CardBody>
                </Card>
            </Container>
        )}
    }
}