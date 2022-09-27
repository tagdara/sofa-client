import React from 'react';
import CardLine from 'layout/components/CardLine'
import DeviceSelect from 'endpoint-model/endpoint/DeviceSelect'
import { IconSquarePlus } from '@tabler/icons';

const ActivityDeviceMissing = props => {

    return (
        <CardLine onClick={props.change}  icon={ <IconSquarePlus size={20} /> }
        />
    )
}

export default ActivityDeviceMissing
