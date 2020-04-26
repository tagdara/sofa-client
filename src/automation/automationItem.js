import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';

import FavoriteIcon from '@material-ui/icons/Star';
import ListIcon from '@material-ui/icons/List';
import EditIcon from '@material-ui/icons/Edit';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';

import CloseIcon from '@material-ui/icons/Close';
import GridItem from '../GridItem';
import ToggleAvatar from '../ToggleAvatar'
import CircularProgress from '@material-ui/core/CircularProgress';

export default function AutomationItem(props) {
    
    
    function summary() {
        if (props.allowEdit) {
            return props.automation.triggers.length+" triggers / "+props.automation.conditions.length+" conditions / "+props.automation.actions.length+' actions'
        } else {
            return " "
        }
    }
    
    return (
        <GridItem wide={props.wide} nopad={true} hover={true}>
        <ListItem >
            { props.launched ?
                <CircularProgress style={{ marginRight: 16 }} size={36} />
            :
                <ToggleAvatar noback={true} avatarState={props.favorite ? "on": "off" } onClick={() => props.makeFavorite('logic:activity:'+props.name, !props.favorite)}>
                    { props.favorite && props.icon!=="base" ? <FavoriteIcon/> : <ListIcon /> }
                </ToggleAvatar>
            }
            <ListItemText primary={props.name} secondary={summary()}
                           
            />
            <ListItemSecondaryAction>
                { props.deleting &&
                    <IconButton size={"small"} onClick={ () => props.delete(props.name) } >
                        <CloseIcon />
                    </IconButton>
                }
                { props.allowEdit ?
                    <IconButton size={"small"} onClick={ () => props.select(props.name) } >
                        <EditIcon />
                    </IconButton>
                :
                    <IconButton size={"small"} onClick={ () => { props.run(props.name) }} >
                        <PlayArrowIcon />
                    </IconButton>                
                }
            </ListItemSecondaryAction>
        </ListItem>
        </GridItem>
    )
}

AutomationItem.defaultProps = {
    launcher: false,
    allowEdit: true,
    deleting: false
}

