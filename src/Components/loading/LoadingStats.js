import React, { Component } from "react"

import LoadingScreen from 'react-loading-screen'


export default class LoadingStats extends Component {

    state = {
        loading: true
    }

    componentDidMount() {
        window.scrollTo(0,0)
        this.loadDone()
    }

    loadDone = () => {
       setTimeout(this.props.isLoading, 1000)
       this.setState({
           loading: false
       })
    }

    render() {
        return (
            <LoadingScreen
            loading={this.props.loading}
            bgColor='#bbc0c9'
            spinnerColor='#5f86d3'
            textColor='#f9fbff'
            text='Gathering all of your saved entries...'
                > 

        <div></div>
        </LoadingScreen>
        )
    }

}