import React, { useContext } from 'react';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import StorageIcon from '@material-ui/icons/Storage';

import { LayoutContext } from 'layout/LayoutProvider';
import ToggleAvatar from 'components/ToggleAvatar';
import GridItem from 'components/GridItem'

export default function ShortcutHero(props) {
    
    const { applyLayoutCard } = useContext(LayoutContext);

    return (
        <GridItem wide={props.wide} >
            <ListItem onClick={() => applyLayoutCard('AutomationsLayout')}>
                <ToggleAvatar noback={true} avatarState="on">
                    <StorageIcon />
                </ToggleAvatar>
                <ListItemText primary={'Shortcuts'} secondary={'Macros and other automation'}/>
            </ListItem>
        </GridItem>
    );
}
