import React from 'react';
import { withLayout } from './layout/NewLayoutProvider';
import { withData } from './DataContext/withData';
import { useState, useEffect } from 'react';

import ToggleAvatar from './ToggleAvatar';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import CloseIcon from '@material-ui/icons/Close';
import DialpadIcon from '@material-ui/icons/Dialpad';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import TuneIcon from '@material-ui/icons/Tune';
import DevicesOtherIcon from '@material-ui/icons/DevicesOther';

import GridItem from './GridItem';

function MiniLauncher(props) {
    
    const [onCount, setOnCount] = useState(0)

    useEffect(() => {
        var ondevs=0
        for (var i = 0; i < props.devices.length; i++) {
            if (props.deviceProperties[props.devices[i].endpointId].powerState=='ON') {
                ondevs+=1
            }
        }
        setOnCount(ondevs)
    }, [props.deviceProperties])

    return (
        <GridItem wide={props.wide}>
            <ListItem onClick={ () => props.applyLayoutCard('MoreDevicesLayout') } >
                <ToggleAvatar noback={true} avatarState={ onCount ? 'on' : 'off'}><DevicesOtherIcon /></ToggleAvatar>
                <ListItemText primary={"More Devices"} secondary={onCount ? onCount+" devices on" : null} />
            </ListItem>
        </GridItem>
    );
}

export default withData(withLayout(MiniLauncher));
