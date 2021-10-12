import React from 'react';

import IconButton from '@material-ui/core/IconButton';

import CommentIcon from '@material-ui/icons/Comment';
import DataUsageIcon from '@material-ui/icons/DataUsage';
import DeveloperBoardIcon from '@material-ui/icons/DeveloperBoard';
import SpeakerIcon from '@material-ui/icons/Speaker';
import SpeakerGroupIcon from '@material-ui/icons/SpeakerGroup';
import TouchAppIcon from '@material-ui/icons/TouchApp';
import TuneIcon from '@material-ui/icons/Tune';
import ListIcon from '@material-ui/icons/List';
import TvIcon from '@material-ui/icons/Tv';

import LightbulbOutlineIcon from 'resources/LightbulbOutline';
import SofaListItem from 'components/SofaListItemNoChildren';



function Device(props) {

    const icons = {'SCENE_TRIGGER':TuneIcon, 'ACTIVITY_TRIGGER':ListIcon, 'LIGHT':LightbulbOutlineIcon, 'BUTTON':TouchAppIcon, 'SPEAKER':SpeakerIcon, 'THERMOSTAT':DataUsageIcon, 'RECEIVER':SpeakerGroupIcon, 'TV':TvIcon}

    function getIcon(category, size='default') {
            
        var pxSize=24;
        var RealIcon=DeveloperBoardIcon 
        if (size==='small') {
            pxSize=16
        }
        if (icons.hasOwnProperty(category)) {
            RealIcon=icons[category]
        } 

        return <RealIcon size={pxSize} fontSize={size} />
    }

    function secondaryClick(event) {
        event.stopPropagation()
        props.showDevice(props.device.endpointId)
    }

    return (
            <SofaListItem   avatar={ getIcon(props.device.displayCategories) } 
                            avatarState={'off'} small={props.small}
                            avatarBackground={false}
                            onClick={() => props.select(props.device)}
                            primary={props.device.friendlyName} secondary={props.device.displayCategories}
                            secondaryActions={
                                <IconButton edge="end" aria-label="See Details" onClick={secondaryClick}>
                                    <CommentIcon />
                                </IconButton>
                            }
            />
    )
}

export default React.memo(Device);
