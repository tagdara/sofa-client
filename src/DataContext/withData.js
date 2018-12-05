import * as React from "react";
import { DataContext } from "./DataContext";

export function withData(Component) {
    return function DataComponent(props) {
        return (
            <DataContext.Consumer>
                { context => 
                            <Component {...props} {...context} deviceByEndpointId={context.deviceByEndpointId} controllerProperties={context.controllerProperties} 
                                virtualDevices={context.virtualDevices} deviceByName={context.deviceByName} devicesByCategory={context.devicesByCategory} 
                                directives={context.directives} deviceProperties={context.propertiesFromDevices(context.devicesByCategory(props.Category))} 
                                propertiesFromDevices={context.propertiesFromDevices} sendAlexaCommand={context.sendAlexaCommand} 
                                devices={context.devicesByCategory(props.Category)} />
                }
            </DataContext.Consumer>
        );
    };
}