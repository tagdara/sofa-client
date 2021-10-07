import React, { useEffect } from 'react';

import Switch from '@material-ui/core/Switch';
import TuneIcon from '@material-ui/icons/Tune';

import { deviceStatesAreEqual, dataFilter } from 'context/DeviceStateFilter'

import SofaItem from 'components/SofaItem';

const Device = React.memo(props => {


    useEffect(() => {
        props.addEndpointIds('id', props.endpointId, 'Device-'+props.endpointId)
        return function cleanup() {
            props.unregisterDevices('Device-'+props.endpointId);
        };
    // eslint-disable-next-line 
    }, []) 
    
    if (!props.deviceState || !props.deviceState[props.endpointId]) { return null }

    const deviceState = props.deviceState[props.endpointId]
    const device = props.devices[props.endpointId]

    function handlePowerChange(event) {
        props.directive(props.endpointId, "PowerController", event.target.checked ? 'TurnOn' : 'TurnOff')
    }; 

    function energy() {
        if (deviceState.hasOwnProperty('Energy Level')) {
            return deviceState["Energy Level"].mode.value
        }

        if (deviceState.hasOwnProperty('EnergySensor')) {
            return deviceState.EnergySensor.power.value+"W"
        }
        return null
    }

    return (    <SofaItem avatarBackground={false} avatarState={ deviceState.PowerController.powerState.value === 'ON' ? 'on' : 'off' } noPad={true}
                    avatar={ props.icon ? props.icon : <TuneIcon />} nested={ props.nested }
                    primary={ device.friendlyName } secondary={ energy()}
                    secondaryActions={
                        <Switch color="primary" checked={ deviceState.PowerController.powerState.value === 'ON' } onChange={ handlePowerChange } />
                    }
                />
    )
}, deviceStatesAreEqual);

export default dataFilter(Device);


