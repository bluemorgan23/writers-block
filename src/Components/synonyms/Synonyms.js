import React, { Component } from "react"



import {Card, CardBody, CardText, Input, CardHeader, Button, ButtonGroup, ButtonDropdown, DropdownMenu, DropdownItem, DropdownToggle } from "reactstrap"
import cache from "../../modules/cache"
import filtering from "../../modules/filter"
import entryData from "../../modules/entryData"


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

            const arrayOfSentences = justWord.map(word => this.sentencesContainWords(this.props.sentenceArray, word))

            Promise.all(arrayOfSentences)
            .then(newArray => newArray.filter(response => response !== undefined && response.sentence !== undefined))
            .then(response => this.props.grabData(response))
            .then(response => this.setState({isLoading: false, data: response}))
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
            <Card className="synonymCard m-2">
            <CardHeader className="synonymCardHeader">Let's replace some words!</CardHeader>
            {this.state.buttonClicked === true ? (
                        <CardBody className="synonymCardBody">
                            {(() => {
                                if (this.state.indexToShow ===this.state.articleToGrab) {
                                    return <React.Fragment>
                                        <Input type="textarea" onChange={this.handleChange} value={this.state.entryToEdit} id="entryToEdit"
                                        className="sentenceEdit"
                                         />
                                        <Button onClick={this.onSave} id={this.state.indexToShow} >Save</Button>
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
                    
                        <CardBody className="synonymCardBody">
                            <Button
                            onClick={this.toggleNext} id={this.state.indexToShow}
                            className="mb-2"
                            >Next</Button>
                            <CardText className="sentence"
                            id={this.state.indexToShow}>{this.state.sentencesAndWords.length > 0 && this.state.sentencesAndWords[this.state.indexToShow].sentence}</CardText>
                            
                            <ButtonGroup>
                               <Button size="sm"
                               id={this.state.indexToShow} onClick={this.toggleChange}>Edit</Button>
                               <ButtonDropdown
                                id={this.state.indexToShow}
                                isOpen={this.state.dropdownOpen} 
                                toggle={this.toggle}>
                                    <DropdownToggle caret size="sm">
                                    {this.state.sentencesAndWords.length > 0 && 
                                        this.state.sentencesAndWords[this.state.indexToShow].word}
                                    </DropdownToggle>
                                    <DropdownMenu>
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
                                <Button size="sm">Save All Changes</Button>
                            </ButtonGroup>
                            
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