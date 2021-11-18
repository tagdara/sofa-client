import React from 'react';

import IconButton from '@mui/material/IconButton';

import CommentIcon from '@mui/icons-material/Comment';
import CardLine from 'components/CardLine'
import CardLineIcon from 'components/CardLineIcon'
import CardLineText from 'components/CardLineText'

import DeviceIcon from 'components/DeviceIcon';
import { deviceByEndpointId } from 'store/deviceHelpers'

const Device = props => {

    function secondaryClick(event) {
        event.stopPropagation()
        props.showDevice(props.device.endpointId)
    }

    const device = deviceByEndpointId(props.endpointId)
    const category = device.displayCategories[0]

    const camelSentence = str => {
        return (" " + str).toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, 
            function(match, chr) {
                return chr.toUpperCase();
            }
        );
    }

    const friendlyCategory = category ? camelSentence(category) : ""

    return (
        <CardLine onClick={() => props.select(props.endpointId)} >
            <CardLineIcon on={false}>
                <DeviceIcon displayCategories={device.displayCategories} />
            </CardLineIcon>
            <CardLineText   primary={device.friendlyName} 
                            secondary={friendlyCategory} />
            <IconButton edge="end" aria-label="See Details" onClick={secondaryClick}>
                <CommentIcon />
            </IconButton>
        </CardLine>
    )
}

export default Device;
