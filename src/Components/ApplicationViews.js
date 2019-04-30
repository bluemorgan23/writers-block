// React Imports
import React, {Component} from 'react'
import {Route, Redirect} from "react-router-dom"

// Module Imports
import userData from '../modules/userData';
import entryData from "../modules/entryData"
import filtering from "../modules/filter"

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

    componentDidMount() {


        if(this.isEntrySaved()){
           return entryData.getCurrentEntry(sessionStorage.getItem("currentEntryID"))
        .then(currentEntry => {
           this.setState({
            body: currentEntry.body,
            title: currentEntry.title,
            sentenceArray: filtering.removeEmptyStrings(currentEntry.body.split(".")) 
            }) 
        }) 
        }
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
            sentenceArray: filtering.removeEmptyStrings((entryObj.body).split("."))
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
                     onDelete={this.onDelete}
                     saveEditedEntry = {this.saveEditedEntry}
                     {...props} />
                } else {
                    return <Redirect to="/" />
                }
                
            }} />
            <Route path="/synonyms" render={ props => {
                if(this.isAuthenticated()){
                    return <Synonyms {...props} />
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
