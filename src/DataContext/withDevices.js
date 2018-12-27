import * as React from "react";
import { DataContext } from "./DataContext";

export function withDevices(Component) {
    return function DataComponent(props) {
        return (
            <DataContext.Consumer>
                { context => 
                            <Component {...props} {...context} deviceByEndpointId={context.deviceByEndpointId} controllerProperties={context.controllerProperties} 
                                virtualDevices={context.virtualDevices} deviceByName={context.deviceByName} devicesByCategory={context.devicesByCategory} 
                                directives={context.directives} sendAlexaCommand={context.sendAlexaCommand} 
                                devices={context.devicesByCategory(props.Category)} 
                                setLayout={context.setLayout} setLayoutCard={context.setLayoutCard} 
                                setReturn={context.setReturn} returnName={context.returnName} returnProps={context.returnProps}
                                setBack={context.setBack} backName={context.backName} backProps={context.backProps}
                            />
                }
            </DataContext.Consumer>
        );
    };
}