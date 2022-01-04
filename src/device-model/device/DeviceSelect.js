import React, { useState, forwardRef} from 'react';
import { Group, Select, Text } from '@mantine/core';
import { sortByName, categoryLabelByEndpointId } from 'store/deviceHelpers'
import useDeviceStore from "store/deviceStore"
import DeviceIcon from 'components/DeviceIcon'

const DeviceSelect = props => {

    const devices = useDeviceStore( state => state.devices)
    const sortedDevices = sortByName(Object.keys(devices))
    const [ device, setDevice ] = useState(props.endpointId)
    const values = sortedDevices.map( endpointId => ( { value: endpointId, label: devices[endpointId].friendlyName } ))
    //<ActivityDeviceItem size="xs"  endpointId={value} device={devices[value]}  />

    // !important: Forwarding ref is required
    const SelectItem = forwardRef(
        ({ value, ...others }, ref) => (
            <div ref={ref} {...others}>
                <Group spacing={"xs"} noWrap style={{ padding: "2px 0px" }}>
                    <DeviceIcon size={16} endpointId={value} />
                    <Group direction="column" spacing={0} >
                        <Text weight={600} lineClamp={1} size="xs">{ devices[value].friendlyName }</Text>
                        <Text color={"dimmed"} lineClamp={1} size="xs">{ categoryLabelByEndpointId(value) }</Text>
                    </Group>
                </Group>
            </div>
        )
    );    


    const select = item => {
        console.log('select device', item)
        setDevice(item)
        props.select(item)
    }

    return (
        <Select size="xs"
                radius="md"
                searchable
                clearable
                onDropdownClose={props.onBlur}
                icon={props.icon ? <DeviceIcon size={16} endpointId={device} /> : undefined}
                itemComponent={SelectItem}
                placeholder={"Select a device"}
                onChange={select} 
                value={device}
                data={values}
                style={{ width: props.half ? "50%" : undefined }}
        />
    )
}

export default DeviceSelect;