import * as React from "react";
import { DataContext } from "./NewDataProvider";

export function withData(Component) {
    return function DataComponent(props) {
        return (
            <DataContext.Consumer>
                { context => 
                            <Component {...props} deviceByEndpointId={context.deviceByEndpointId} controllerProperties={context.controllerProperties} 
                                controllerEvents={context.controllerEvents} 
                                getLastUpdate={context.getLastUpdate} lastUpdate={context.lastUpdate} checkUpdate={context.checkUpdate}
                                nameByEndpointId={context.nameByEndpointId}
                                virtualDevices={context.virtualDevices} deviceByName={context.deviceByName} devicesByCategory={context.devicesByCategory} 
                                directives={context.directives} deviceProperties={context.propertiesFromDevices(context.devicesByCategory(props.Category))} 
                                propertiesFromDevices={context.propertiesFromDevices} sendAlexaCommand={context.sendAlexaCommand} 
                                devices={context.devicesByCategory(props.Category)} changeTimesFromDevices={context.changeTimesFromDevices(context.devicesByCategory(props.Category))}
                                getChangeTimesForDevices={context.getChangeTimesForDevices} getHistoryForDevice={context.getHistoryForDevice}
                                region={context.region} setRegion={context.setRegion}
                                timedOut={context.timedOut} refreshData={context.refreshData} getLastUpdate={context.getLastUpdate}
                                lightCount={context.lightCount} 
                            />
                }
            </DataContext.Consumer>
        );
    };
}

export function withHeartbeat(Component) {
    return function DataComponent(props) {
        return (
            <DataContext.Consumer>
                { context => 
                            <Component {...props} 
                                timedOut={context.timedOut} refreshData={context.refreshData} getLastUpdate={context.getLastUpdate}
                                modules={context.modules} setModules={context.setModules}
                            />
                }
            </DataContext.Consumer>
        );
    };
}
