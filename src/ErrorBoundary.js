import React, { Component } from 'react'
import ErrorCard from './ErrorCard'

class ErrorBoundary extends Component {
    
    constructor (props) {
        super(props)
        this.state = { 
            hasError: false,
            error: "",
            info: "",
        }
    }
        
    componentDidCatch (error, info) {
        //console.log('Error',error, info)
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
