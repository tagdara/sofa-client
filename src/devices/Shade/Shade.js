import React from 'react';
import CardLine from 'layout/components/CardLine'
import ShadeButtons from 'devices/Shade/ShadeButtons'
import { endpointByEndpointId } from 'endpoint-model/discovery'
import { IconArrowAutofitHeight } from '@tabler/icons';

const Shade = props => {

    const device = endpointByEndpointId(props.endpointId)   

    return ( 
        <CardLine size={"lg"} icon={<IconArrowAutofitHeight size={20} />} 
                primary={ device.friendlyName }
        >
            <ShadeButtons endpointId={props.endpointId} />
        </CardLine>
    );
}

export default Shade;
