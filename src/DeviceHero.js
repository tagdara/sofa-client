import React, { useContext } from 'react';
import { LayoutContext } from './layout/NewLayoutProvider';

import ToggleAvatar from './ToggleAvatar';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import DevicesOtherIcon from '@material-ui/icons/DevicesOther';

import GridItem from './GridItem';

export default function DeviceHero(props) {
    
    const { applyLayoutCard } = useContext(LayoutContext);

    return (
        <GridItem wide={props.wide}>
            <ListItem onClick={ () => applyLayoutCard('DeviceLayout') } >
                <ToggleAvatar noback={true} avatarState={ 'on' }><DevicesOtherIcon /></ToggleAvatar>
                <ListItemText primary={"All Devices"} />
            </ListItem>
        </GridItem>
    );
}
