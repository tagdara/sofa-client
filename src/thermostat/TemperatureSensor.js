import React, { useContext }from 'react';
import { LayoutContext } from '../layout/NewLayoutProvider';

import CardBase from '../CardBase'
import SofaListItem from '../SofaListItem';

export default function TemperatureSensor(props) { 
    
    const { selectPage } = useContext(LayoutContext);
    
    function tempColor(temp) {
        if (!temp) { return 'disabled' }
        if (temp>=74) { return "hot" }
        if (temp<70) { return "cool" }
        return "mid";
    }
    
    function switchToHistory() {
        selectPage('ThermostatHistory', { 'device':props.device, 'past':'7d'})
    }
    
    return (
        
        <CardBase >
            <SofaListItem   avatar={props.deviceState.TemperatureSensor.temperature.value ? props.deviceState.TemperatureSensor.temperature.deepvalue : '--'} 
                            onClick={props.onClick} avatarClick={() => switchToHistory()} 
                            avatarState={ tempColor(props.deviceState.TemperatureSensor.temperature.deepvalue) }
                            primary={props.device.friendlyName} />
        </CardBase>
    );
}

