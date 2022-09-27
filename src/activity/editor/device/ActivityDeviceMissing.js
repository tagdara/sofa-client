import React from 'react';
import CardLine from 'layout/components/CardLine'
import { IconMaximize } from '@tabler/icons';

const ActivityDeviceMissing = props => {


    return (
        <CardLine onClick={props.onClick} 
                    icon={ <IconMaximize size={20} /> }
                    primary={ props.endpointId } 
                    secondary={ "Device missing" } 
        />
    )
}

export default ActivityDeviceMissing
