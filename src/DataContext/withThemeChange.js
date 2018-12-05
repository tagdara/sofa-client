import * as React from "react";
import { DataContext } from "./DataContext";

export function withThemeChange(Component) {
    return function DataComponent(props) {
        return (
            <DataContext.Consumer>
                { context => <Component {...props} {...context} context={context} setColorScheme={context.setColorScheme} colorScheme={context.colorScheme} /> }
            </DataContext.Consumer>
        );
    };
}
