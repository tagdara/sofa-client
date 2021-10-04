import React from 'react';
import CardBase from 'components/CardBase';
import SofaListItem from 'components/SofaListItem';
import DialpadIcon from '@material-ui/icons/Dialpad';

export default function StatusLock(props) {

    function getSensorController() {
        // console.log('sensor ', props.device, props.deviceState)
        if (props.deviceState.hasOwnProperty('ContactSensor')) {
            return props.deviceState.ContactSensor
        } else if (props.device.hasOwnProperty('MotionSensor')) {
            return props.deviceState.MotionSensor
        }
        return null
    }
    const sensorController = getSensorController()

    if (!sensorController) {
        return null
    }

    const closed = sensorController.detectionState.value==='NOT_DETECTED'

    return (
        <CardBase>
            <SofaListItem   avatarBackground={!closed} avatarState={closed ? "closed" : "open"} avatar={<DialpadIcon />}
                            onClick={props.handlePress}
                            primary={props.name} secondary={ getSensorController().detectionState.value==='NOT_DETECTED' ? 'Closed' : 'Open' }
            />
        </CardBase>
    );

}