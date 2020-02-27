import React, { useState } from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';

import FavoriteIcon from '@material-ui/icons/Favorite';
import ListIcon from '@material-ui/icons/List';
import EditIcon from '@material-ui/icons/Edit';

import CloseIcon from '@material-ui/icons/Close';
import GridItem from '../GridItem';
import ToggleAvatar from '../ToggleAvatar'
import CircularProgress from '@material-ui/core/CircularProgress';

export default function AutomationItem(props) {
    
    const [launched,setLaunched] = useState(false);
    
    return (
        <GridItem wide={props.wide} >
        <ListItem button={props.launcher} >
        { props.edit ?
            <ToggleAvatar avatarState={"off"} onClick={ () => props.delete(props.name)}><CloseIcon /></ToggleAvatar>
        :
            <>
            { launched ?
                <CircularProgress style={{ marginRight: 16 }} size={36} />
            :
                <ToggleAvatar avatarState={props.automation.favorite ? "on": "off" } onClick={ () => { setLaunched(true); props.run(props.name) }}>
                    { props.automation.favorite && props.icon!=="base" ? <FavoriteIcon/> : <ListIcon /> }
                </ToggleAvatar>
            }
            </>
        }
            <ListItemText primary={props.name} secondary={props.automation.triggers.length+" triggers / "+props.automation.conditions.length+" conditions / "+props.automation.actions.length+' actions'}  
                            onClick={ () => { setLaunched(true); props.run(props.name) } } 
            />
        { props.allowEdit &&
            <ListItemSecondaryAction>
                <IconButton size={"small"} onClick={ () => props.select(props.name) } >
                    <EditIcon />
                </IconButton>
            </ListItemSecondaryAction>
        }
        </ListItem>
        </GridItem>
    )
}

AutomationItem.defaultProps = {
    launcher: false,
    allowEdit: true
}

