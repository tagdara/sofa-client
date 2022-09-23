import React from 'react';
import CardLine from 'layout/components/CardLine'
import { HelpCircle} from 'react-feather'

const ActivityDeviceMissing = props => {


    return (
        <CardLine onClick={props.onClick} 
                    icon={ <HelpCircle size={20} /> }
                    primary={ props.endpointId } 
                    secondary={ "Device missing" } 
        />
    )
}

export default ActivityDeviceMissing
