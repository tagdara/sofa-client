import React from 'react';

import IconButton from '@mui/material/IconButton';

import CommentIcon from '@mui/icons-material/Comment';
import ListItem from 'components/NewListItem';
import ListItemAvatar from 'components/NewListItemAvatar';
import ListItemText from 'components/NewListItemText';
import ListItemSecondaryAction from 'components/NewListItemSecondaryAction';
import DeviceIcon from 'components/DeviceIcon';


const Device = props => {

    function secondaryClick(event) {
        event.stopPropagation()
        props.showDevice(props.device.endpointId)
    }

    return (
        <ListItem onClick={() => props.select(props.device)} >
            <ListItemAvatar loading={false} state={"off"} background={false}>
                <DeviceIcon displayCategories={props.device.displayCategories} />
            </ListItemAvatar>
            <ListItemText   primary={props.device.friendlyName} 
                            secondary={props.device.displayCategories} />
            <ListItemSecondaryAction inline={true} >
                <IconButton edge="end" aria-label="See Details" onClick={secondaryClick}>
                    <CommentIcon />
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
    )
}

export default Device;
