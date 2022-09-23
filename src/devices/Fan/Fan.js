import React from 'react';
import CardLine from 'layout/components/CardLine'
import { IconWindmill as IconFan } from '@tabler/icons';
import { friendlyNameByEndpointId } from 'endpoint-model/discovery'
import PowerStateSwitch from 'endpoint-model/property/powerState/PowerStateSwitch'

const Fan = props => {

    const name = friendlyNameByEndpointId(props.endpointId)

    return (    
        <CardLine  size={"lg"}  icon={ props.icon ? props.icon : <IconFan size={20} />}
                    primary={ name } 
        >
            <PowerStateSwitch endpointId={props.endpointId} />
        </CardLine>
    )
}

export default Fan;


