import React, { useContext, useState } from "react";
import { DataContext } from './DataProvider';
import { DeviceContext } from './DeviceProvider';

export const deviceStatesAreEqual = (prevProps, nextProps) => {
    const skips = ['deviceState', 'addEndpointIds', 'directive']
    if (prevProps && nextProps) {
        for (var prop in nextProps) {
            if (!skips.includes(prop)) {
                if (prevProps[prop] !== nextProps[prop]) {
                    console.log('false on', prop)
                    return false
                }
            } else {
                if ('deviceState' in prevProps && 'deviceState' in nextProps ) {
                    for (var dev in nextProps.deviceState) {
                        //console.log('Comparing', prevProps.deviceState[dev], nextProps.deviceState[dev] )
                        if (dev in prevProps.deviceState) {
                            try {
                                if (prevProps.deviceState[dev].last_update < nextProps.deviceState[dev].last_update) {
                                    return false
                                }
                            }
                            catch {
                                return false
                            }
                        } else {
                            return false
                        }
                    }
                }
            }
        }
    }
    return true
};

export const dataFilter = (WrappedComponent) => {

    const DataComponent = props => {
        const { devices, registerEndpointIds, unregisterDevices} = useContext(DeviceContext);
        const [ endpointList, setEndpointList ] = useState([])
        const [ localDevices, setLocalDevices ] = useState({})

        function addEndpointIds(filterType, filter, source) {
            var results = []
            switch (filterType) {
                case "id":      
                    results = addEndpointId(filter)
                    break;
                case "ids":      
                    results = updateEndpointIds(filter)
                    break;
                case "category":
                    results = addEndpointIdsByCategory(filter)   
                    break;
                default:
                    break;

            }
            return results
        }

        function addEndpointId(endpointId) {
            var updatedEndpointList = [...endpointList]
            if (!endpointList.includes(endpointId)) {
                if (endpointId in devices) {
                    setLocalDevices({...localDevices, [endpointId]: devices[endpointId]})
                }
                updatedEndpointList = [...updatedEndpointList, endpointId]
                setEndpointList(updatedEndpointList)
                return endpointId
            }
        }

        function updateEndpointIds(idList) {
            if (!idList) { return false }
            var changes = false
            var updatedEndpointList = [...endpointList]
            var updatedLocalDevices = {...localDevices}
            for (var i = 0; i < idList.length; i++) {
                var endpointId = idList[i]
                if (!endpointList.includes(endpointId)) {
                    if (endpointId in devices) {
                        updatedLocalDevices = {...updatedLocalDevices, [endpointId]: devices[endpointId]}
                    }
                    updatedEndpointList = [...updatedEndpointList, endpointId]
                    changes = true
                }
            }

            if (changes) {
                setEndpointList(updatedEndpointList)
                setLocalDevices(updatedLocalDevices)
                registerEndpointIds(updatedEndpointList)
            }
        }

        function addEndpointIdsByCategory(category) {

            var idList = []
            for (var device in devices) {
                try {
                    if (devices[device].displayCategories.includes(category.toUpperCase())) {
                        idList.push(device)
                    }
                }
                catch {}
            }
            updateEndpointIds(idList)
            return idList
        }


        function getEndpointStates() {
            var result = {}
            for (var i = 0; i < endpointList.length; i++) {
                try {
                    result[endpointList[i]] = deviceStates[endpointList[i]]
                } 
                catch {}
            }
            return result
        }

        return (
            <WrappedComponent   {...props} deviceState={getEndpointStates()} devices={localDevices} addEndpointIds={addEndpointIds} 
                                directive={directive} unregisterDevices={unregisterDevices} />
        );
    }
     
    return DataComponent;
};

