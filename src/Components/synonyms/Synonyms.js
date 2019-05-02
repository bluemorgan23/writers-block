import React, { Component } from "react"

import {Card, CardBody, CardText, Input, CardHeader, Button, ButtonGroup, ButtonDropdown, DropdownMenu, DropdownItem, DropdownToggle } from "reactstrap"
import cache from "../../modules/cache"

import "./synonyms.css"
import { finished } from "stream";
import filtering from "../../modules/filter";

class Synonyms extends Component {

    state = {
        buttonClicked: false,
        articleToGrab: 0,
        entryToEdit: "",
        originalSentenceArray: [],
        sentencesAndWords: [],
        indexToShow: 0,
        lowScoringWords: [],
        dropdownOpen: false
    }

    static getDerivedStateFromProps(props) {

        const lowScoringWords = cache.eachScore.filter(word => word.response.ten_degree < cache.avg.ten_degree)

        const justWord = lowScoringWords.map(word => word.response.entry)

        const arrayOfSentences = []
            justWord.forEach(word => arrayOfSentences.push(filtering.sentencesContainWords(props.sentenceArray, word)))
        
        return {
            originalSentenceArray: props.sentenceArray,
            sentencesAndWords: arrayOfSentences,
            lowScoringWords: justWord
        }
    }

    

    toggle = () => {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        })
    }


    // shouldComponentUpdate(nextProps, nextState){
    //     return this.props.originalSentenceArray !== nextProps.originalSentenceArray
    // }

    
    

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
        let length = this.props.sentenceArray.length;
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

            this.props.updateSentence(this.state.entryToEdit, Number(event.target.id))

        } else {

            this.props.updateSentence(` ${this.state.entryToEdit}`, Number(event.target.id))
            
        } 

        this.setState({ buttonClicked: false, originalSentenceArray: this.props.sentenceArray })
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
                                        id={this.state.indexToShow}>{this.props.sentenceArray[this.state.indexToShow]}</CardText>
                                        <Button id={this.state.indexToShow} onClick={this.toggleChange}>Edit</Button>

                                    </React.Fragment>
                                }
                            })()}
                        </CardBody>
                    )

                    :
                    
                        <CardBody className="synonymCardBody">
                            <Button onClick={this.toggleNext} id={this.state.indexToShow}
                            className="mb-2"
                            >Next</Button>
                            <CardText className="sentence"
                            id={this.state.indexToShow}>{this.props.sentenceArray[this.state.indexToShow]}</CardText>
                            <ButtonGroup>
                               <Button id={this.state.indexToShow} onClick={this.toggleChange}>Edit</Button>
                               <ButtonDropdown
                                id={this.state.indexToShow}
                                isOpen={this.state.dropdownOpen} 
                                toggle={this.toggle}>
                                    <DropdownToggle caret size="sm">
                                        Word To Replace
                                    </DropdownToggle>
                                    <DropdownMenu>
                                        <DropdownItem>Another Action</DropdownItem>
                                        <DropdownItem>Another Action</DropdownItem>
                                    </DropdownMenu>
                                </ButtonDropdown>
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