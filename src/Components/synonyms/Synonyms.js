import React, { Component } from "react"

import {Card, CardBody, CardText, Input, CardHeader, Button, ButtonGroup, ButtonDropdown, DropdownMenu, DropdownItem, DropdownToggle } from "reactstrap"
import cache from "../../modules/cache"

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
    }


    componentDidMount(){

        const lowScoringWords = cache.eachScore.filter(word => word.response.ten_degree < cache.avg.ten_degree)

        const justWord = lowScoringWords.map(word => word.response.entry)

        const arrayOfSentences = justWord.map(word => this.sentencesContainWords(this.props.sentenceArray, word))

         Promise.all(arrayOfSentences)
         .then(response => {
           let newArray = response.filter(response => response !== undefined)
           this.setState({
               sentencesAndWords: newArray
           })
         })
        
    }

    componentDidUpdate(prevProps) {
        if(prevProps.sentenceArray !== this.props.sentenceArray && this.state.sentencesAndWords.length > 0){
            const lowScoringWords = cache.eachScore.filter(word => word.response.ten_degree < cache.avg.ten_degree)

        const justWord = lowScoringWords.map(word => word.response.entry)

        const arrayOfSentences = justWord.map(word => this.sentencesContainWords(this.props.sentenceArray, word))

         Promise.all(arrayOfSentences)
         .then(response => {
           let newArray = response.filter(response => response !== undefined)
           this.setState({
               sentencesAndWords: newArray
           })
         })
        }
    }
    

    replaceWord = (event) => {
        
        let updatedEntry = this.props.entry.replace(event.target.parentNode.parentNode.firstChild.innerHTML, event.target.value)

        return this.props.updateEntry(updatedEntry)
    }

    sentencesContainWords = (sentenceArray, word) => {
        
       

        let sentenceString = sentenceArray.find(sentence => {
            return sentence.toLowerCase().includes(word.toLowerCase())
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
        // this.state.sentencesAndWords.length > 0 && console.log("matches", this.state.sentencesAndWords[0].matches, this.state.sentencesAndWords)
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