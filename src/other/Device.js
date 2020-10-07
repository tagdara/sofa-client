import React from 'react';

import Switch from '@material-ui/core/Switch';
import TuneIcon from '@material-ui/icons/Tune';
import GridItem from '../GridItem';
import SofaListItem from '../SofaListItem';

export default function Device(props) {
 
    function handlePowerChange(event) {
        props.directive(props.device.endpointId, "PowerController", event.target.checked ? 'TurnOn' : 'TurnOff')
    }; 

    function nestLine(item) {
        if (props.deviceState.PowerController.powerState) {
            if (props.nested) { return item }
            return <GridItem>{item}</GridItem>
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
                <SofaListItem   inList={true} avatarBackground={false} avatarState={ props.deviceState.PowerController.powerState.value==='ON' ? 'on' : 'off'}
                                avatar={ props.icon ? props.icon : <TuneIcon />}
                                primary={props.device.friendlyName} secondary={ energy()}
                                secondaryActions={
                                    <Switch color="primary" checked={props.deviceState.PowerController.powerState.value==='ON'} onChange={handlePowerChange} />
                                }
                />
        )
    );
}


