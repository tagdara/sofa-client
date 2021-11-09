import React from 'react';
import CardBase from 'components/CardBase';
import DialpadIcon from '@mui/icons-material/Dialpad';
import green from '@mui/material/colors/green';
import red from '@mui/material/colors/red';

import CardLine from 'components/CardLine';
import CardLineText from 'components/CardLineText';
import CardLineIcon from 'components/CardLineIcon';

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
    const iconColor = closed ? green[500] : red[500]
 
    return (
        <CardBase>
            <CardLine onClick={props.handlePress} itemType={"listItem"}>
                <CardLineIcon color={iconColor} >
                    <DialpadIcon />
                </CardLineIcon>      
                <CardLineText primary={props.name} secondary={ closed ? 'Closed' : 'Open' }/>
            </CardLine>
        </CardBase>
    );

}