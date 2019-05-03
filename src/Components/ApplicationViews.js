// React Imports
import React, {Component} from 'react'
import {Route, Redirect} from "react-router-dom"

// Module Imports
import userData from '../modules/userData';
import entryData from "../modules/entryData"
import filtering from "../modules/filter"
import cache from "../modules/cache"

// Component Imports
import Register from "./register/Register"
import Login from "./login/Login"
import NewEntry from './newEntry/NewEntry';
import Results from "./results/Results"
import Synonyms from "./synonyms/Synonyms"
import Stats from "./stats/Stats"

class ApplicationViews extends Component {

    state = {
        body: "",
        title: "",
        sentenceArray: []
    }

    componentWillMount() {

        if(this.isEntrySaved()){
           return entryData.getCurrentEntry(sessionStorage.getItem("currentEntryID"))
        .then(currentEntry => {
           this.setState({
            body: currentEntry.body,
            title: currentEntry.title,
            sentenceArray: filtering.removeEmptyStrings(currentEntry.body.split(".")),
             avgScore: currentEntry.avgScore,
             scoreGroup: currentEntry.scoreGroup.name,
             scoreGroupId: currentEntry.scoreGroupId
            }) 
        }) 
        }
    }

    componentWillUnmount(){
        this.setState({
            body: "", title: "", sentenceArray: [], avgScore: null, scoreGroup: ""
        })
    }

    updateEntry = (updatedEntry) => {
        return this.setState({
            body: updatedEntry
        })
    }

    updateSentence = (updatedSentece, index) => {

        let removeWhitespace = updatedSentece.trim()
        let finalProduct = removeWhitespace
        
    
        return this.setState(state => {
            const sentenceArray = state.sentenceArray.map((sentence, j) => 
            
            {
                if(index !== 0){
                finalProduct = ` ${removeWhitespace}`
                } 
                if(j === index){
                    return finalProduct
                } else {
                    return sentence
                }
            })
    
            const joinedArray = sentenceArray.join("")

            let editedEntry = {
                id: sessionStorage.getItem("currentEntryID"),
                userId: sessionStorage.getItem("userID"),
                body: joinedArray,
                title: this.state.title
            }
    
            entryData.putEntry(editedEntry)
            
            return {sentenceArray: sentenceArray, entry: joinedArray}
        })
    }

    isAuthenticated = () => sessionStorage.getItem("userID") !== null

    isEntrySaved = () => sessionStorage.getItem("currentEntryID") !== null

    onRegister = (userToRegister) => {
        return userData.postUser(userToRegister)
            .then(() => userData.getAllUsers())
            .then(userList => {
                return userList.find(user => user.username.toLowerCase() === userToRegister.username.toLowerCase())
            })
            .then(matchedUser => this.setState({
                userID: matchedUser.id
            }))
    }

    onAnalyze = (entryObj) => {
        let stateToChange = {
            title: entryObj.title,
            body: entryObj.body,
            sentenceArray: filtering.removeEmptyStrings((entryObj.body).split(".")),
            avgScore: entryObj.avgScore,
            scoreGroupId: entryObj.scoreGroupId,
            scoreGroup: entryObj.scoreGroup
        }
        this.setState(stateToChange)
        return entryData.postNewEntry(entryObj)
    }

    onDelete = (id) => {
        if(Number(id) === Number(sessionStorage.getItem("currentEntryID"))){
            sessionStorage.removeItem("currentEntryID")
            return entryData.deleteEntry(id)
            .then(() => this.setState({
                body: "",
                title: "",
                sentenceArray: []
            }))
        } else {
            return entryData.deleteEntry(id)
        }
        
    }

    saveEditedEntry = (edit) => {
        console.log(edit)
        return entryData.putEntry(edit)
        .then(() => entryData.getCurrentEntry(sessionStorage.getItem("currentEntryID")))
        .then(matchedEntry => this.setState({
            body: matchedEntry.body,
            title: matchedEntry.title,
            sentenceArray: filtering.removeEmptyStrings(matchedEntry.body.split("."))
        }))
    }

    render(){
        return (
        <React.Fragment>
            <Route exact path="/" render={ props => {
                if(this.isAuthenticated()){
                    return <Redirect to="/stats" />
                } else {
                    return <Login  {...props} />
                }
                
            }} />
            <Route path="/register" render={ props => {
                if(this.isAuthenticated()){
                    return <Redirect to="/stats" />
                } else {
                    return <Register onRegister={this.onRegister} {...props} />
                }
                
            }} />
            <Route path="/new-entry" render={ props => {
                if(this.isAuthenticated()){
                    return <NewEntry onAnalyze={this.onAnalyze} {...props} />
                } else {
                    return <Redirect to="/" />
                }
                
            }} />
            <Route path="/results" render={ props => {
                if(this.isAuthenticated()){
                    return <Results body={this.state.body}
                     title={this.state.title} 
                     sentenceArray={this.state.sentenceArray}
                     avgScore={this.state.avgScore}
                     scoreGroup={this.state.scoreGroup}
                     onDelete={this.onDelete}
                     saveEditedEntry = {this.saveEditedEntry}
                     scoreGroupId = {this.state.scoreGroupId}
                     {...props} />
                } else {
                    return <Redirect to="/" />
                }
                
            }} />
            <Route path="/synonyms" render={ props => {
                if(this.isAuthenticated()){
                    return <Synonyms sentenceArray={this.state.sentenceArray} entry={this.state.body}
                    updateSentence={this.updateSentence}
                    updateEntry={this.updateEntry}
                    {...props} />
                } else {
                    return <Redirect to="/" />
                }
            }} />
            <Route path="/stats" render={ props => {
                if(this.isAuthenticated()){
                    return <Stats  delete={this.onDelete}{...props} />
                } else {
                    return <Redirect to="/" />
                }
                
            }} />
        </React.Fragment>
            
        )
    }
}

export default ApplicationViews
