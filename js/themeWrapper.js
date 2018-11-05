import React, {Component} from "react";
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { withSofaTheme } from './dataContext';
import lightTheme from './lightTheme';
import darkTheme from './darkTheme';
import CssBaseline from "@material-ui/core/CssBaseline";

export class ThemeWrapperComponent extends Component {
  
    constructor(props){
        super(props);
    }
    
    setTheme = themeName => {

        if (themeName=='dark') {
            return darkTheme
        } else if (themeName=='light') {
            return lightTheme
        }  
        
        var d = new Date();
        var n = d.getHours();
        
        if (n>7 || n<8) {
            return darkTheme
        } else {
            return lightTheme
        }
    }

    render(){
        return (
            
            <MuiThemeProvider theme={this.setTheme(this.props.colorScheme)}>
            <React.Fragment>
                <CssBaseline />
                { this.props.children }
            </React.Fragment>
            </MuiThemeProvider>
        )
    }
}

export const ThemeWrapper = withSofaTheme(ThemeWrapperComponent);