import React, { Component } from "react"



import {Card, CardBody, CardText, Input, CardHeader, Button, ButtonDropdown, DropdownMenu, DropdownItem, DropdownToggle, Badge } from "reactstrap"
import cache from "../../modules/cache"
import filtering from "../../modules/filter"
import entryData from "../../modules/entryData"
import LoadingSyns from "../loading/LoadingSyns"


import synAPI from "../../modules/synAPI"


import "./synonyms.css"



class Synonyms extends Component {

    state = {
        buttonClicked: false,
        articleToGrab: 0,
        entryToEdit: "",
        sentencesAndWords: [],
        indexToShow: 0,
        dropdownOpen: false,
        isLoading: true
    }



    componentDidMount(){

        if(this.props.sentencesAndWords){
            this.setState({
                sentencesAndWords: this.props.sentencesAndWords
            })
        } 
    }



    async componentDidUpdate(prevProps, prevState) {
      
        
        if(prevProps.sentenceArray !== this.props.sentenceArray){
        
            let idToGrab = Number(sessionStorage.getItem("currentEntryID"))
            
            const response = entryData.getCurrentEntry(idToGrab)
            const json = await response
            console.log(json.body)
            const wordArray = await filtering.getRidOfPunctuation(json.body)
         
            const newArray = await filtering.filterOutWeakWords(wordArray)

            const cachedData = await cache.locStr(newArray)
            const lowScoringWords = cachedData.filter(word => word.response.ten_degree < this.props.avgScore)

         

            const justWord = lowScoringWords.map(word => word.response.entry)

            const arrayOfSentences = await justWord.map(word => this.sentencesContainWords(this.props.sentenceArray, word))

            if(this.state.sentencesAndWords.length === 0 || !this.state.sentencesAndWords){
                window.alert("Looking good! Let's check out your new results!")
                this.props.history.push("/results")
            } else {
              Promise.all(arrayOfSentences)
                .then(newArray => newArray.filter(response => response !== undefined && response.sentence !== undefined))
                .then(response => this.props.grabData(response))
                .then(response => this.setState({isLoading: false, sentencesAndWords: response}))  
            }

            
    }
}
    
    replaceWord = (event) => {
        
        let updatedEntry = this.props.entry.replace(event.target.parentNode.parentNode.firstChild.innerHTML, event.target.value)


        return this.props.updateEntry(updatedEntry)
    }

    sentencesContainWords = (sentenceArray, word) => {
        
        let sentenceString = sentenceArray.find(sentence => {
            return sentence.includes(word)
        })

        let newObj = {sentence: sentenceString, word: word, index: sentenceArray.indexOf(sentenceString), matches: []}

        return synAPI.getSynonymsForWord(word)
        .then(results => {
            if(results.length > 0){
                newObj.matches = results
                return newObj 
            }    
        })
    }

    toggle = () => {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        })
    }

    toggleChange = (event) => {
        event.preventDefault()

        const stateChange = {
            buttonClicked: true,
            articleToGrab: Number(event.target.id),
            entryToEdit: event.target.parentNode.parentNode.firstChild.nextSibling.textContent
        }

        this.setState(stateChange)

    }

    toggleNext = (event) => {
        event.preventDefault()

        if(!this.state.sentencesAndWords){
            window.alert("No more suggestions! Let's see how you did.")
        }

        let length = this.state.sentencesAndWords.length

        if( this.state.indexToShow === (length - 1)){

            return this.setState({indexToShow: 0})

        } else {

            return this.setState(prevState => {
                return prevState.indexToShow += 1
            })
        }
    }

    onSave = (event) => {
        event.preventDefault()
        if(this.state.indexToShow === 0){

            this.props.updateSentence(this.state.entryToEdit, this.state.sentencesAndWords[this.state.indexToShow].index)

        } else {

            this.props.updateSentence(` ${this.state.entryToEdit}`, this.state.sentencesAndWords[this.state.indexToShow].index)
            
        } 

        this.setState({ buttonClicked: false })
    }

    handleChange = (event) => {
        let stateChange = { entryToEdit: event.target.value  }

        this.setState(stateChange)
    }



    render() {

        return (

            
            <React.Fragment>
            <Card className="synonymCard m-2 mt-4">
            <CardHeader className="synonymCardHeader bg-dark">
                <h1>
                    <Badge color="dark"
                    className="heading">
                        Let's replace some words!
                    </Badge>
                </h1>
            </CardHeader>
            {this.state.buttonClicked === true ? (
                        <CardBody className="synonymCardBody">
                            {(() => {
                                if (this.state.indexToShow ===this.state.articleToGrab) {
                                    return <React.Fragment>
                                        <Input type="textarea" onChange={this.handleChange} value={this.state.entryToEdit} id="entryToEdit"
                                        className="sentenceEdit"
                                         />
                                        <Button
                                        size="lg"
                                        color="dark"
                                        className="mt-2 synEdit-save"
                                        onClick={this.onSave} id={this.state.indexToShow} >Save</Button>
                                    </React.Fragment>
                                } else {
                                    return <React.Fragment>
                                        <CardText
                                        className="sentence"
                                        id={this.state.indexToShow}>{this.state.sentencesAndWords[this.state.indexToShow]}</CardText>
                                        <Button id={this.state.indexToShow} onClick={this.toggleChange}>Edit</Button>

                                    </React.Fragment>
                                }
                            })()}
                        </CardBody>
                    )

                    :
                    
                        <CardBody className="synonymCardBody bg-light">
                            <Button size="lg"
                            color="dark"
                            onClick={this.toggleNext} 
                            id={this.state.indexToShow}
                            className="mb-2 nextButton"
                            >Next</Button>
                            <CardText className="sentence mt-2"
                            id={this.state.indexToShow}>{this.state.sentencesAndWords.length > 0 && this.state.sentencesAndWords[this.state.indexToShow].sentence}</CardText>
                            
                            <div className="mt-2 synsButtons">
                               <Button className="mr-1"
                                    color="dark"
                                    size="lg"
                                    id={this.state.indexToShow} onClick={this.toggleChange}>Edit Sentence
                                </Button>
                                
                               <ButtonDropdown className="mr-1 synDrop"
                                color="dark"
                                id={this.state.indexToShow}
                                isOpen={this.state.dropdownOpen} 
                                toggle={this.toggle}>
                                    <DropdownToggle className="synDrop"
                                    color="dark"
                                        caret size="lg">
                                    {this.state.sentencesAndWords.length > 0 && 
                                        this.state.sentencesAndWords[this.state.indexToShow].word}
                                    </DropdownToggle>
                                    <DropdownMenu right>
                                    {this.state.sentencesAndWords.length > 0 && 
                                        
                                    this.state.sentencesAndWords[this.state.indexToShow].matches.map(match => {
                                        let sentence = this.props.entry.toLowerCase()
                                        let word = this.state.sentencesAndWords[this.state.indexToShow].word.toLowerCase()
                                        return <DropdownItem 
                                        onClick={this.replaceWord}
                                        value={match}
                                        id={sentence.indexOf(word)}
                                        >{match}</DropdownItem>
                                    })}
                                    </DropdownMenu>
                                </ButtonDropdown>
                                <Button color="dark"
                                    onClick={() => this.props.history.push("/results")}
                                    size="lg">
                                    Save Changes
                                </Button>
                            </div>
                            
                        </CardBody>
                }
            </Card>
            <br></br>
            <Card className="m-2">
                <CardBody>
                    <CardText>{this.props.entry}</CardText>
                </CardBody> 
            </Card>
            </React.Fragment>
        )
    }
}

export default Synonyms