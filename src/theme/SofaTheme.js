import React, { useState, useEffect, createContext  } from 'react';
import LightTheme from 'theme/sofaThemeLight';
import DarkTheme from 'theme/sofaThemeDark';
import useUserStore from 'store/userStore'

export const SofaThemeContext = createContext();

export default function SofaThemeProvider(props) {
    
    const [colorScheme, setColorScheme] = useState('');
    const [sofaTheme, setSofaTheme] = useState({});
    const userTheme = useUserStore(state => state.preferences.theme)
    const updateUser = useUserStore(state => state.update)
    
    useEffect(() => {
        var pref = getPreferredColorScheme()
        if (pref === "dark") {
        //if (userTheme==='dark') {
            setColorScheme('dark')
            setSofaTheme(DarkTheme)
        } else {
            setColorScheme('light')
            setSofaTheme(LightTheme)
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
            return DarkTheme
        } else {
            return LightTheme
        }
    }

    function pickUserTheme(themeName) {
        updateUser('theme', themeName)
        applyTheme(themeName)
        console.log('set user theme to ', themeName)
    }

    function applyTheme(themeName) {
        
        if (themeName==='dark') {
            setColorScheme('dark')
            setSofaTheme(DarkTheme)
            return DarkTheme
        } else if (themeName==='light') {
            setColorScheme('light')
            setSofaTheme(LightTheme)
            return LightTheme
        }
        return getTheme()
    }

    const theme = getTheme(colorScheme)

    return (
        <SofaThemeContext.Provider
            value={{
                theme: theme,
                colorScheme: colorScheme,
                sofaTheme: sofaTheme,
                applyTheme: applyTheme,
                getTheme: getTheme,
                pickUserTheme: pickUserTheme,
            }}
        >
                { props.children }
        </SofaThemeContext.Provider>
    );
}
