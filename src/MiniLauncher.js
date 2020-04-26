import React, { useContext } from 'react';
import { LayoutContext } from './layout/NewLayoutProvider';
import { DataContext } from './DataContext/DataProvider';

import ToggleAvatar from './ToggleAvatar';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import DevicesOtherIcon from '@material-ui/icons/DevicesOther';

import GridItem from './GridItem';

export default function MiniLauncher(props) {
    
    const { applyLayoutCard } = useContext(LayoutContext);
    const { deviceStatesByFriendlyName } = useContext(DataContext);
    const switches=deviceStatesByFriendlyName(['Bathroom Fan','Bathroom Heat Fan'], false, 'SWITCH')
    

    function onCount() {
        var ondevs=0
        for (var i = 0; i < switches.length; i++) {
            if (switches[i].PowerController.powerState.value==='ON') {
                ondevs+=1
            }
        }
        return ondevs
    }

    return (
        <GridItem wide={props.wide} noPad={true}>
            <ListItem onClick={ () => applyLayoutCard('MoreDevicesLayout') } >
                <ToggleAvatar noback={true} avatarState={ onCount() ? 'on' : 'off'}><DevicesOtherIcon /></ToggleAvatar>
                <ListItemText primary={"More Devices"} secondary={onCount() ? onCount()+" devices on" : null} />
            </ListItem>
        </GridItem>
    );
}
