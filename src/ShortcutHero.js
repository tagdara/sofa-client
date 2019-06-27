import React from 'react';
import { withLayout } from './layout/NewLayoutProvider';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ToggleAvatar from './ToggleAvatar';
import GridItem from './GridItem'

import StorageIcon from '@material-ui/icons/Storage';

function ShortcutHero(props) {

    return (
        <GridItem wide={props.wide} >
            <ListItem onClick={() => props.applyLayoutCard('AutomationsLayout')}>
                <ToggleAvatar noback={true} avatarState="on">
                    <StorageIcon />
                </ToggleAvatar>
                <ListItemText primary={'Shortcuts'} secondary={'Macros and other automation'}/>
            </ListItem>
        </GridItem>
    );
}

export default withLayout(ShortcutHero);
