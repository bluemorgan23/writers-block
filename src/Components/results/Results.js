import React, {Component} from "react"



import EditResults from "./EditResults"
import cache from "../../modules/cache"
import filtering from "../../modules/filter"

import entryData from "../../modules/entryData"
import LoadingSyns from "../loading/LoadingSyns"
import NoResults from "../fourZeroFour/NoResultSaved"

//icons 
import { GiEnlightenment } from "react-icons/gi"
import { IoIosBowtie } from "react-icons/io"
import { GiCrown } from "react-icons/gi"
import { GiBrain } from "react-icons/gi"

import { Card, CardHeader, CardTitle, CardText, Button, CardBody, ButtonGroup, Container, Row, Badge, CardDeck } from "reactstrap"
import "./results.css"
import LoadingScore from "../loading/LoadingScore";



export default class Results extends Component {

    state = {
        editButtonClicked: false,
        averageScore: 0,
        scoreGroup: "",
        isLoadingSyns: false,
        sentencesAndWords: [],
        isLoadingResults: true,
        noResults: false
    }

    static getDerivedStateFromProps(nextProps,props)  {
        if(nextProps.avgScore !== props.avgScore){
    
            return {averageScore: nextProps.avgScore, scoreGroup: nextProps.scoreGroup}
        
        } 
        else {
            return null
        }
    }

    scoreLoadingChange = () => {
        if(this.props.isEntrySaved()){
           return this.setState({isLoadingResults: !this.state.isLoadingResults})
        } else {
            return this.setState({noResults: true})
        }
        
    }

    componentDidMount = async() => {
        

        let idToGrab = Number(sessionStorage.getItem("currentEntryID"))
            if(idToGrab){

                const response = entryData.getCurrentEntry(idToGrab)

                const json = await response
            
                const wordArray = await filtering.getRidOfPunctuation(json.body)

           
                const newArray = await filtering.filterOutWeakWords(wordArray)


                cache.locStr(newArray)

                this.setState({
                    averageScore: await json.avgScore, scoreGroup: await json.scoreGroup
                })

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

    savingEditedEntry = async (edit) => {
        
        await this.props.saveEditedEntry(edit)

        let idToGrab = Number(sessionStorage.getItem("currentEntryID"))
        if(idToGrab){

        const response = entryData.getCurrentEntry(idToGrab)

        const json = await response


        this.setState({
            editButtonClicked: false,
            isLoadingResults: !this.state.isLoadingResults,
            averageScore: await json.avgScore,
            scoreGroup: await json.scoreGroup
        })
    }
    }

    

    render() {
        if(this.state.noResults) {
            return <NoResults />
        }

       else if(this.state.isLoadingResults){
            return <LoadingScore
                    scoreLoadingChange={this.scoreLoadingChange}
                    isLoadingResults={this.state.isLoadingResults}
                    history={this.props.history}
                    isEntrySaved={this.props.isEntrySaved}
                    />
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
            } 
            
        else {
        return (
            <Container className="resultsContainer" fluid >
            <Card className="mt-3 resultsCard">
                <CardHeader className="bg-dark text-center">
                    <h1 className="resultsTitle">
                        <Badge color="dark"
                        className="heading">
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
                                            <h3>
                                                <Badge className="subTitle"
                                                color="dark">
                                                   {this.props.title} 
                                                </Badge>
                                            </h3>
                                        </CardTitle>
                                        <CardText className="resultsEntryBody">{this.props.body}</CardText>  
                                    </CardBody>
                                </Card>
                                </Row>
                               
                                
                               <Row>
                                <CardDeck className="mt-3 bottomGroup">
                                    <Card className="resultsAnalysis text-center ml-5">
                                        <CardHeader className="bg-dark">
                                            <h1 className="resultsTitle">
                                                <Badge className="heading" color="dark">
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
                                    <Card className="rightBottom-card mr-5">
                                    <CardHeader className="bg-dark text-center">
                                        <h1 className="resultsTitle"
                                        id="">
                                        <Badge className="heading"
                                            color="dark"
                                        >
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
                                                color="primary"
                                                block
                                                onClick={this.switchToSyns}
                                                >Find Synonyms</Button>
                                                <Button 
                                                size="lg"
                                                className="mt-1"
                                                block
                                                color="primary"
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