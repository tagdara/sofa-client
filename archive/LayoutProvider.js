import React, { PureComponent, Component, createElement  } from 'react';

export const LayoutContext = React.createContext();

export class LayoutProvider extends PureComponent {
  
    constructor(props) {
        super(props);

        this.state = {
            layout: {},
            fullLayout: {},
            layoutName: "Home",
            layoutProps: {},
            layoutPage: "",
            
            returnName: "",
            returnProps: {},
            backName: "",
            backProps: {},
        };
    }

    setLayout = (layoutName, layoutProps) => {
        this.setState({ layoutName : layoutName, layoutProps: layoutProps, layout : this.state.fullLayout[layoutName] })
    }
    
    setLayoutCard = (layoutName, layoutProps) => {
        this.setState({ layoutName : layoutName, layoutProps: layoutProps, layout : { type: "single" } })
    }

    setReturn = (returnName, returnProps) => {
        console.log('setting return',returnName, returnProps)
        this.setState({ returnName : returnName, returnProps: returnProps })
    }

    setBack = (backName, backProps) => {
        this.setState({ backName : backName, backProps: backProps })
    }
    
    goBack = (backName, backProps) => {
        this.setLayoutCard(this.state.backName, this.state.backProps)
        this.setState({ backName: '', backProps: {}})
    }
    
    setLayoutPage = (newPage) => {
        this.setState({ layoutPage : newPage })
    }

    catchError = ( error ) => {
        console.log( error );
    }

    componentDidMount() {

  	    fetch('/layout')
 		    .then(result=>result.json())
            .then(result=>this.setState({ fullLayout : result, layout : result[this.state.layoutName]}));

    }

    render() {
        return (
            <LayoutContext.Provider
                value={{
                    fullLayout: this.state.fullLayout,
                    layout: this.state.layout,
                    layoutName: this.state.layoutName,
                    layoutProps: this.state.layoutProps,
                    layoutPage: this.state.layoutPage,
                    setLayout: this.setLayout,
                    setLayoutCard: this.setLayoutCard,
                    setLayoutPage: this.setLayoutPage,
                    returnName: this.state.returnName,
                    returnProps: this.state.returnProps,
                    setReturn: this.setReturn,
                    goBack: this.goBack,
                    backName: this.state.backName,
                    backProps: this.state.backProps,
                    setBack: this.setBack,
                }}
            >
                {this.props.children}
            </LayoutContext.Provider>
        );
    }
}

export default LayoutProvider;