import React, { useState, useEffect, useContext } from 'react';
import lightTheme from './sofaThemeLight';
import darkTheme from './sofaThemeDark';
import { ThemeProvider } from '@material-ui/styles';
import CssBaseline from "@material-ui/core/CssBaseline";
import { UserContext } from '../user/UserProvider';

export const ThemeContext = React.createContext();

export default function SofaThemeProvider(props) {
    
    const [colorScheme, setColorScheme] = useState('');
    const [sofaTheme, setSofaTheme] = useState({});
    const { chooseUserTheme, userTheme } = useContext(UserContext);
    
    useEffect(() => {
        var pref = getPreferredColorScheme()
        if (pref === "dark") {
        //if (userTheme==='dark') {
            setColorScheme('dark')
            setSofaTheme(darkTheme)
        } else {
            setColorScheme('light')
            setSofaTheme(lightTheme)
        }
        
    }, [userTheme]);

    function getPreferredColorScheme() {
        if (window.matchMedia) {
            if(window.matchMedia('(prefers-color-scheme: dark)').matches){
                return 'dark';
            } else {
                return 'light';
            }
        }
        return 'light';
      }

    function getTheme() {
        if (sofaTheme.hasOwnProperty('palette')) { 
            return sofaTheme 
        }
        var d = new Date();
        var n = d.getHours();
        if (n>17 || n<8) {
            return darkTheme
        } else {
            return lightTheme
        }
    }

    function pickUserTheme(themeName) {
        chooseUserTheme(themeName)
        applyTheme(themeName)
        console.log('set user theme to ', themeName)
    }

    function applyTheme(themeName) {
        
        if (themeName==='dark') {
            setColorScheme('dark')
            setSofaTheme(darkTheme)
            return darkTheme
        } else if (themeName==='light') {
            setColorScheme('light')
            setSofaTheme(lightTheme)
            return lightTheme
        }
        return getTheme()
    }

    return (
        <ThemeContext.Provider
            value={{
                colorScheme: colorScheme,
                sofaTheme: sofaTheme,
                applyTheme: applyTheme,
                getTheme: getTheme,
                pickUserTheme: pickUserTheme,
            }}
        >
            <ThemeProvider theme={getTheme(colorScheme)}>
                <CssBaseline />
                { props.children }
            </ThemeProvider>
        </ThemeContext.Provider>
    );
}
