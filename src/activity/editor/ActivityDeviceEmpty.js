import React from 'react';
import CardLine from 'layout/components/CardLine'
import { PlusSquare } from 'react-feather'
import DeviceSelect from 'endpoint-model/endpoint/DeviceSelect'

const ActivityDeviceMissing = props => {

    return (
        <CardLine onClick={props.change}  
                    icon={ <PlusSquare size={20} /> }
        />
    )
}

export default ActivityDeviceMissing
