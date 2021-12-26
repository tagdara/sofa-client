import React, { useState } from 'react';

import { deviceByEndpointId } from 'store/deviceHelpers'
import { selectActivityDevice } from 'store/activityEditorHelpers'
import useActivityEditorStore from 'store/activityEditorStore'

import ActivityDeviceItem from 'activity/editor/ActivityDeviceItem'
import ActivityDeviceMissing from 'activity/editor/ActivityDeviceMissing'
import DeviceSelect from 'device-model/device/DeviceSelect'

const ActivityDevice = props => {
    const [selecting, setSelecting ] = useState(false)
    const item = useActivityEditorStore(state => state.activity[props.category][props.index] )

    if (!item) { return null}

    const endpointId = item.endpointId
    const device = endpointId ? deviceByEndpointId(endpointId) : undefined
    const deviceEmpty = ( !endpointId && !device)
    const deviceMissing = ( endpointId && !device)

    function loseFocus() {
        setSelecting(false)
    }

    function selectDevice(newEndpointId) {
        selectActivityDevice(props.category, props.index, newEndpointId)
    }

    if ( selecting || deviceEmpty ) { 
        return <DeviceSelect select={selectDevice} endpointId={endpointId} onBlur={loseFocus} />
    }

    if (deviceMissing) {
        return <ActivityDeviceMissing endpointId={endpointId} onClick={() => setSelecting(true)}  />
    }

    return (
        <ActivityDeviceItem endpointId={endpointId} device={device} onClick={() => setSelecting(true)}  />
    )
}

export default ActivityDevice
