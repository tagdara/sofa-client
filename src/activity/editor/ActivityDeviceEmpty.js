import React from 'react';
import CardLine from 'components/CardLine'
import { PlusSquare } from 'react-feather'
import DeviceSelect from 'device-model/device/DeviceSelect'

const ActivityDeviceMissing = props => {

    return (
        <CardLine onClick={props.change}  
                    icon={ <PlusSquare size={20} /> }
        />
    )
}

export default ActivityDeviceMissing
