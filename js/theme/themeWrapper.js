import React, {Component} from "react";
import { withThemeChange } from '../DataContext/withThemeChange';
import lightTheme from './sofaThemeLight';
import darkTheme from './sofaThemeDark';
import CssBaseline from "@material-ui/core/CssBaseline";
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

export class ThemeWrapper extends Component {
  
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
        if (n>20 || n<8) {
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

export default withThemeChange(ThemeWrapper);