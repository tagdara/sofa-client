import React, { useState } from 'react';

import DeviceDialog from 'dialogs/DeviceDialog';
import { deviceByEndpointId } from 'store/deviceHelpers'
import { selectActivityDevice } from 'store/activityEditorHelpers'
import useActivityEditorStore from 'store/activityEditorStore'

import ActivityLineSegment from 'activity/editor/layout/ActivityLineSegment'

import ActivityDeviceEmpty from 'activity/editor/ActivityDeviceEmpty'
import ActivityDeviceItem from 'activity/editor/ActivityDeviceItem'
import ActivityDeviceMissing from 'activity/editor/ActivityDeviceMissing'

const ActivityDevice = props => {

    const [ deviceSelect, setDeviceSelect]  = useState(false);
    const item = useActivityEditorStore(state => state.activity[props.category][props.index] )

    if (!item) { return null}

    const endpointId = item.endpointId
    const device = endpointId ? deviceByEndpointId(endpointId) : undefined

    function closeDialog() {
        setDeviceSelect(false)
    }
    
    function selectDevice(newEndpointId) {
        selectActivityDevice(props.category, props.index, newEndpointId)
    }

    function openSelectDialog() {
        setDeviceSelect(true)
    }
    
    return (
        <ActivityLineSegment wide={props.wide} >
            { ( !endpointId && !device) &&
                <ActivityDeviceEmpty onClick={openSelectDialog} />
            }
            { ( endpointId && !device) &&
                <ActivityDeviceMissing endpointId={endpointId} onClick={openSelectDialog} />
            }
            { ( endpointId && device) &&
                <ActivityDeviceItem endpointId={endpointId} device={device} onClick={openSelectDialog} />
            }
            { deviceSelect &&
                <DeviceDialog open={true} close={closeDialog} select={selectDevice} />
            }
        </ActivityLineSegment>
    )
}

export default ActivityDevice
