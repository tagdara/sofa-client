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
                                devices={context.devicesByCategory(props.Category)} changeTimesFromDevices={context.changeTimesFromDevices(context.devicesByCategory(props.Category))}
                                getChangeTimesForDevices={context.getChangeTimesForDevices}
                                setLayout={context.setLayout} setLayoutCard={context.setLayoutCard} 
                                layout={context.layout} layoutName={context.layoutName} layoutProps={context.layoutProps} fullLayout={context.fullLayout} 
                                region={context.region} setRegion={context.setRegion}
                                player={context.player} setPlayer={context.setPlayer}
                                setReturn={context.setReturn} returnName={context.returnName} returnProps={context.returnProps}
                                setBack={context.setBack} backName={context.backName} backProps={context.backProps}
                            />
                }
            </DataContext.Consumer>
        );
    };
}