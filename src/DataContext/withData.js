import * as React from "react";
import { DataContext } from "./DataProvider";

export function withData(Component) {
    return function DataComponent(props) {
        return (
            <DataContext.Consumer>
                { context => 
                            <Component {...props} devices={context.devicesByCategory(props.Category)} virtualDevices={context.virtualDevices}
                                deviceByEndpointId={context.deviceByEndpointId} deviceByFriendlyName={context.deviceByFriendlyName} 
                                devicesByCategory={context.devicesByCategory} 
                                
                                controllerEvents={context.controllerEvents} controllerProperties={context.controllerProperties} 
                                directives={context.directives}
                                getLastUpdate={context.getLastUpdate} lastUpdate={context.lastUpdate} checkUpdate={context.checkUpdate}

                                propertyNamesFromDevice={context.propertyNamesFromDevice}
                                getChangeTimesForDevices={context.getChangeTimesForDevices} getHistoryForDevice={context.getHistoryForDevice}
                                region={context.region} setRegion={context.setRegion}
                                timedOut={context.timedOut} refreshData={context.refreshData} getLastUpdate={context.getLastUpdate}
                                lightCount={context.lightCount} isReachable={context.isReachable} sortByName={context.sortByName}
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
                            />
                }
            </DataContext.Consumer>
        );
    };
}
