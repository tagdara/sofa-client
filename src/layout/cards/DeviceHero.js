import React, { useContext } from 'react';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import DevicesOtherIcon from '@material-ui/icons/DevicesOther';

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
