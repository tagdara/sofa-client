import React, {useContext} from 'react';
import { LayoutContext } from './layout/NewLayoutProvider';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ToggleAvatar from './ToggleAvatar';
import GridItem from './GridItem'

import StorageIcon from '@material-ui/icons/Storage';

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
