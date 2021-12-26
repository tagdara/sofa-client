import React, { useState, forwardRef} from 'react';
import { Select } from '@mantine/core';
import { sortByName } from 'store/deviceHelpers'
import useDeviceStore from "store/deviceStore"
import ActivityDeviceItem from 'activity/editor/ActivityDeviceItem'

const DeviceSelect = props => {

    const devices = useDeviceStore( state => state.devices)
    const sortedDevices = sortByName(Object.keys(devices))
    const [ device, setDevice ] = useState(props.endpointId)
    const values = sortedDevices.map( endpointId => ( { value: endpointId, label: devices[endpointId].friendlyName } ))

    // !important: Forwarding ref is required
    const SelectItem = forwardRef(
        ({ value }, ref) => (
            <ActivityDeviceItem size="xs" ref={ref} endpointId={value} device={devices[value]}  />
        )
    );    


    return (
        <Select size="sm"
                searchable
                clearable
                onDropdownClose={props.onBlur}
                itemComponent={SelectItem}
                placeholder={"Select a device"}
                onChange={setDevice} 
                value={device}
                data={values}
                style={{ width: props.half ? "50%" : undefined }}
        />
    )
}

export default DeviceSelect;