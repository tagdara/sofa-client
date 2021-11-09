import React, { useContext } from 'react';

import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

import DevicesOtherIcon from '@mui/icons-material/DevicesOther';

import { LayoutContext } from 'layout/LayoutProvider';

import ToggleAvatar from 'components/ToggleAvatar';
import GridItem from 'components/GridItem';

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
