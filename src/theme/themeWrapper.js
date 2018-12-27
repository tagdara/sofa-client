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
        
        // You can't set the color scheme from here because it's a render function, but for right now its not breaking anything

        if (themeName=='dark') {
            this.props.setTheme(darkTheme)
            return darkTheme
        } else if (themeName=='light') {
            this.props.setTheme(lightTheme)
            return lightTheme
        }  
        
        var d = new Date();
        var n = d.getHours();
        if (n>17 || n<8) {
            this.props.setColorScheme('dark')
            this.props.setTheme(darkTheme)
            return darkTheme
        } else {
            this.props.setColorScheme('light')
            this.props.setTheme(lightTheme)
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