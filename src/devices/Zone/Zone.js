import React from 'react';
import Moment from 'react-moment';
import 'moment-timezone';
import ClearIcon from '@material-ui/icons/Clear';
import DoneIcon from '@material-ui/icons/Done';
import ToggleAvatar from 'components/ToggleAvatar';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import GridItem from 'components/GridItem';

export default function Zone(props) {    

    function getSensorController() {
        if (props.deviceState.hasOwnProperty('ContactSensor')) {
            return props.deviceState.ContactSensor
        } else if (props.deviceState.hasOwnProperty('MotionSensor')) {
            return props.deviceState.MotionSensor
        }
        return null
    }

    return (
        <GridItem >
            <ListItem onClick={() => props.history(props.device.friendlyName, props.endpointId)}>
                <ToggleAvatar avatarState={ getSensorController().detectionState.value==='NOT_DETECTED' ? 'closed' : 'open' } > 
                    { getSensorController().detectionState.value==='NOT_DETECTED' ? <DoneIcon /> : <ClearIcon /> }
                </ToggleAvatar>
                <ListItemText primary={props.device.friendlyName} secondary={props.changeTime==='Unknown' ? 'Unknown':<Moment format="ddd MMM D h:mm:sa">{props.changeTime}</Moment>} />
            </ListItem>
        </GridItem>
    );
}
