import React from 'react';
import CardBase from '../CardBase';
import SofaListItem from '../SofaListItem';
import DialpadIcon from '@material-ui/icons/Dialpad';

export default function StatusLock(props) {

    function getSensorController() {
        if (props.deviceState.hasOwnProperty('ContactSensor')) {
            return props.deviceState.ContactSensor
        } else if (props.device.hasOwnProperty('MotionSensor')) {
            return props.deviceState.MotionSensor
        }
        return null
    }
    
    const closed=getSensorController().detectionState.value==='NOT_DETECTED'

    return (
        <CardBase>
            <SofaListItem   avatarBackground={!closed} avatarState={closed ? "on" : "open"} avatar={<DialpadIcon />}
                            onClick={props.handlePress}
                            primary={props.name} secondary={ getSensorController().detectionState.value==='NOT_DETECTED' ? 'Closed' : 'Open' }
            />
        </CardBase>
    );

}