import React from 'react';

import Switch from '@mui/material/Switch';
import TuneIcon from '@mui/icons-material/Tune';
import CardBase from 'components/CardBase';
import SofaListItem from 'components/SofaListItem';

export default function Device(props) {
 
    function handlePowerChange(event) {
        props.directive(props.device.endpointId, "PowerController", event.target.checked ? 'TurnOn' : 'TurnOff')
    }; 

    function nestLine(item) {
        if (props.deviceState.PowerController.powerState) {
            if (props.nested) { return item }
            return <CardBase>{item}</CardBase>
        }
        return null
    }
    
    function energy() {
        if (props.deviceState.hasOwnProperty('Energy Level')) {
            return props.deviceState["Energy Level"].mode.value
        }

        if (props.deviceState.hasOwnProperty('EnergySensor')) {
            return props.deviceState.EnergySensor.power.value+"W"
        }
        return null
    }

    return (
        nestLine(
                <SofaListItem   avatarBackground={false} avatarState={ props.deviceState.PowerController.powerState.value==='ON' ? 'on' : 'off'} noPad={true}
                                avatar={ props.icon ? props.icon : <TuneIcon />}
                                primary={props.device.friendlyName} secondary={ energy()}
                                secondaryActions={
                                    <Switch color="primary" checked={props.deviceState.PowerController.powerState.value==='ON'} onChange={handlePowerChange} />
                                }
                />
        )
    );
}


