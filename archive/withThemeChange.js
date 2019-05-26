import * as React from "react";
import { ThemeContext } from "./SofaTheme"

export function withThemeChange(Component) {
    
    return function ThemeComponent(props) {
        return (
            <ThemeContext.Consumer>
                { context => <Component {...props} {...context} context={context} 
                                setColorScheme={context.setColorScheme} colorScheme={context.colorScheme} 
                                setTheme={context.setTheme} sofaTheme={context.sofaTheme} getTheme={context.getTheme}
                            /> }
            </ThemeContext.Consumer>
        );
    };
}
