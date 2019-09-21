import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import FavoriteIcon from '@material-ui/icons/Favorite';
import ListIcon from '@material-ui/icons/List';
import CloseIcon from '@material-ui/icons/Close';
import GridItem from '../GridItem';
import ToggleAvatar from '../ToggleAvatar'

export default function AutomationItem(props) {

    return (
        <GridItem wide={props.wide} >
        <ListItem>
        { props.edit ?
            <ToggleAvatar avatarState={"off"} onClick={ () => props.delete(props.name)}><CloseIcon /></ToggleAvatar>
        :
            <ToggleAvatar avatarState={props.automation.favorite? "on": "off"} onClick={ () => props.run(props.name)}>
                { props.automation.favorite ? <FavoriteIcon/> : <ListIcon /> }
            </ToggleAvatar>
        }
            <ListItemText primary={props.name} secondary={props.automation.triggers.length+" triggers / "+props.automation.conditions.length+" conditions / "+props.automation.actions.length+' actions'}  onClick={() => props.select(props.name)}/>
        </ListItem>
        </GridItem>
    )
}

