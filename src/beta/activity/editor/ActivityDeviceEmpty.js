import React from 'react';
import CardLine from 'beta/components/CardLine'
import { PlusSquare } from 'react-feather'
import DeviceSelect from 'beta/device-model/device/DeviceSelect'

const ActivityDeviceMissing = props => {

    return (
        <CardLine onClick={props.onClick}  
                    icon={ <PlusSquare size={20} /> }
        >
            <DeviceSelect select={props.select}/>
        </CardLine>
    )
}

export default ActivityDeviceMissing
