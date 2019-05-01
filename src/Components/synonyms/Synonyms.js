import React, { Component } from "react"

import {Card, CardBody, CardText, Input, CardHeader, Button } from "reactstrap"

import "./synonyms.css"

class Synonyms extends Component {

    state = {
        buttonClicked: false,
        articleToGrab: 0,
        entryToEdit: "",
        allEntries: this.props.sentenceArray,
        indexToShow: 0
    }

    toggleChange = (event) => {
        event.preventDefault()
        const stateChange = {
            buttonClicked: true,
            articleToGrab: Number(event.target.id),
            entryToEdit: event.target.parentNode.firstChild.nextSibling.textContent
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

        this.setState({ buttonClicked: false, allEntries: this.props.sentenceArray })
    }

    handleChange = (event) => {
        let stateChange = { entryToEdit: event.target.value  }

        this.setState(stateChange)
    }



    render() {
        // console.log(this.props.sentenceArray[this.state.indexToShow][0])
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
                            <CardText id={this.state.indexToShow}>{this.props.sentenceArray[this.state.indexToShow]}</CardText>
                            <Button id={this.state.indexToShow} onClick={this.toggleChange}>Edit</Button>
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