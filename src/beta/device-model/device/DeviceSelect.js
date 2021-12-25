import React, { useState} from 'react';
import { Select } from '@mantine/core';
import useDeviceStore from "store/deviceStore"

const DeviceSelect = props => {

    const devices = useDeviceStore( state => state.devices)
    const [ device, setDevice ] = useState(null)
    const values = Object.keys(devices).map( endpointId => ( { value: endpointId, label: devices[endpointId].friendlyName } ))

    return (
        <Select size="sm"
                searchable
                placeholder={"Select a device"}
                onChange={setDevice} 
                value={device}
                data={values}
                style={{ width: props.half ? "50%" : undefined }}
        />
    )
}

export default DeviceSelect;