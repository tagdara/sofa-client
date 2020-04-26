import React, { useContext } from 'react';
import { LayoutContext } from '../layout/NewLayoutProvider';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListAltIcon from '@material-ui/icons/ListAlt';
import GridItem from '../GridItem';
import ToggleAvatar from '../ToggleAvatar'

export default function AutomationAll(props) {
    
    const { applyLayoutCard } = useContext(LayoutContext);
    
    return (
        <GridItem wide={props.wide} nopad={true} hover={true} onClick={() => applyLayoutCard('AutomationsLayout', {'favorites':false})} >
        <ListItem >
            <ToggleAvatar noback={true} avatarState={"off" }> 
                <ListAltIcon />
            </ToggleAvatar>
            <ListItemText primary={"All Automations"} />
        </ListItem>
        </GridItem>
    )
}

