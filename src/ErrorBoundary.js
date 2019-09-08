import React, { Component } from 'react'
import ErrorCard from './ErrorCard'

class ErrorBoundary extends Component {
    
    // This is one of the last non-functional components because as of 9/2019 there was no hooks equivalent
    // for componentDidCatch.
    
    constructor (props) {
        super(props)
        this.state = { hasError: false, error: "", info: "" }
    }
        
    componentDidCatch (error, info) {
        this.setState({ hasError: true, error: error, info: info})
    }
    
    render () {
        if (this.state.hasError) {
            return  <ErrorCard wide={this.props.wide} name={this.state.error.name} message={this.state.error.message} />
        }
        return this.props.children
    }
}

export default ErrorBoundary