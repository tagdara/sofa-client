import React from 'react';
import CardLine from 'beta/components/CardLine'
import ShadeButtons from 'beta/devices/Shade/ShadeButtons'
import { deviceByEndpointId } from 'store/deviceHelpers'
import { Columns } from 'react-feather'

const Shade = props => {

    const device = deviceByEndpointId(props.endpointId)   

    return ( 
        <CardLine icon={<Columns size={20} />} 
                primary={ device.friendlyName }
        >
            <ShadeButtons endpointId={props.endpointId} />
        </CardLine>
    );
}

export default Shade;
