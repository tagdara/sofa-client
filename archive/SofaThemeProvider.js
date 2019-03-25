import React, { PureComponent, Component, createElement  } from 'react';

import lightTheme from './sofaThemeLight';
import darkTheme from './sofaThemeDark';
import { ThemeProvider, makeStyles } from '@material-ui/styles';

export const ThemeContext = React.createContext();

export class SofaThemeProvider extends PureComponent {
  
    constructor(props) {
        super(props);

        this.state = {
            colorScheme: '',
            sofaTheme: {},
        };
    }
    
    getTheme = () => {
        if (this.state.sofaTheme.hasOwnProperty('palette')) { 
            return this.state.sofaTheme 
        }
        var d = new Date();
        var n = d.getHours();
        if (n>17 || n<8) {
            return darkTheme
        } else {
            return lightTheme
        }
         
    }
    
    setTheme = themeName => {
        
        if (themeName=='dark') {
            this.setState({colorScheme: 'dark', sofaTheme: darkTheme})
            return darkTheme
        } else if (themeName=='light') {
            this.setState({colorScheme: 'light', sofaTheme: lightTheme})
            return lightTheme
        }  
        
        var d = new Date();
        var n = d.getHours();
        if (n>17 || n<8) {
            this.setState({colorScheme: 'dark', sofaTheme: darkTheme})
            return darkTheme
        } else {
            this.setState({colorScheme: 'light', sofaTheme: lightTheme})
            return lightTheme
        }
    }

    setColorScheme = scheme => {
        this.setState({colorScheme: scheme})
        this.setTheme(scheme)
    }

    componentDidMount() {
        
        //window.addEventListener('resize', this.handleWindowSizeChange);
        this.setTheme()
    }

    render() {
        return (
            <ThemeContext.Provider
                value={{
                    colorScheme: this.state.colorScheme,
                    setColorScheme: this.setColorScheme,
                    sofaTheme: this.state.sofaTheme,
                    setTheme: this.setTheme,
                    getTheme: this.getTheme,
                }}
            >
                <ThemeProvider theme={this.getTheme(this.state.colorScheme)}>
                    { this.props.children }
                </ThemeProvider>
            </ThemeContext.Provider>
        );
    }
}

export default SofaThemeProvider;