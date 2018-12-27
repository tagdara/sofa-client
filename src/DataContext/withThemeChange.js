import * as React from "react";
import { DataContext } from "./DataContext";

export function withThemeChange(Component) {
    return function DataComponent(props) {
        return (
            <DataContext.Consumer>
                { context => <Component {...props} {...context} context={context} 
                                setColorScheme={context.setColorScheme} colorScheme={context.colorScheme} 
                                setTheme={context.setTheme} theme={context.theme}
                                setLayout={context.setLayout} layout={context.layout} layoutName={context.layoutName} setLayoutCard={context.setLayoutCard}
                                fullLayout={context.fullLayout} /> }

            </DataContext.Consumer>
        );
    };
}
