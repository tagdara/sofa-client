import React from 'react';
import CardLine from 'components/CardLine'
import { FaFan as FanIcon } from "react-icons/fa";
import { friendlyNameByEndpointId } from 'store/deviceHelpers'
import PowerStateSwitch from 'device-model/property/powerState/PowerStateSwitch'

const Fan = props => {

    const name = friendlyNameByEndpointId(props.endpointId)

    return (    
        <CardLine  size={"lg"}  icon={ props.icon ? props.icon : <FanIcon size={20} />}
                    primary={ name } 
        >
            <PowerStateSwitch endpointId={props.endpointId} />
        </CardLine>
    )
}

export default Fan;


