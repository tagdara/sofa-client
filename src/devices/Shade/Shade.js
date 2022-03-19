import React from 'react';
import CardLine from 'components/CardLine'
import ShadeButtons from 'devices/Shade/ShadeButtons'
import { deviceByEndpointId } from 'store/deviceHelpers'
import { Easel3 as ShadeIcon } from 'react-bootstrap-icons'

const Shade = props => {

    const device = deviceByEndpointId(props.endpointId)   

    return ( 
        <CardLine size={"lg"} icon={<ShadeIcon size={20} />} 
                primary={ device.friendlyName }
        >
            <ShadeButtons endpointId={props.endpointId} />
        </CardLine>
    );
}

export default Shade;
