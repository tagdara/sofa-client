import React from 'react';

import { deviceByEndpointId } from 'store/deviceHelpers'
import { selectActivityDevice } from 'store/activityEditorHelpers'
import useActivityEditorStore from 'store/activityEditorStore'

import ActivityDeviceEmpty from 'beta/activity/editor/ActivityDeviceEmpty'
import ActivityDeviceItem from 'beta/activity/editor/ActivityDeviceItem'
import ActivityDeviceMissing from 'beta/activity/editor/ActivityDeviceMissing'

const ActivityDevice = props => {

    const item = useActivityEditorStore(state => state.activity[props.category][props.index] )

    if (!item) { return null}

    const endpointId = item.endpointId
    const device = endpointId ? deviceByEndpointId(endpointId) : undefined

    function selectDevice(newEndpointId) {
        selectActivityDevice(props.category, props.index, newEndpointId)
    }

    return (
        <>
            { ( !endpointId && !device) &&
                <ActivityDeviceEmpty  select={selectDevice} />
            }
            { ( endpointId && !device) &&
                <ActivityDeviceMissing endpointId={endpointId} select={selectDevice}  />
            }
            { ( endpointId && device) &&
                <ActivityDeviceItem endpointId={endpointId} device={device} select={selectDevice} />
            }
        </>
    )
}

export default ActivityDevice
