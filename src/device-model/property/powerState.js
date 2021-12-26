import React from 'react';
import PowerStateSwitch from 'device-model/property/powerState/PowerStateSwitch';

const PowerState = props => {

    return (    
        <PowerStateSwitch {...props} />
    )
}

export default PowerState;