import * as React from "react";
import { DataContext } from "./DataProvider";

export function withDevices(Component) {
    return function DataComponent(props) {
        return (
            <DataContext.Consumer>
                { context => 
                            <Component {...props} {...context} deviceByEndpointId={context.deviceByEndpointId} controllerProperties={context.controllerProperties} 
                                virtualDevices={context.virtualDevices} deviceByName={context.deviceByName} devicesByCategory={context.devicesByCategory} 
                                directives={context.directives} devices={context.devicesByCategory(props.Category)} 
                            />
                }
            </DataContext.Consumer>
        );
    };
}