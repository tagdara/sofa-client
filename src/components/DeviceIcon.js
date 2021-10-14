import React from 'react';

import DataUsageIcon from '@material-ui/icons/DataUsage';
import DeveloperBoardIcon from '@material-ui/icons/DeveloperBoard';
import SpeakerIcon from '@material-ui/icons/Speaker';
import SpeakerGroupIcon from '@material-ui/icons/SpeakerGroup';
import TouchAppIcon from '@material-ui/icons/TouchApp';
import TuneIcon from '@material-ui/icons/Tune';
import ListIcon from '@material-ui/icons/List';
import TvIcon from '@material-ui/icons/Tv';
import LightbulbOutlineIcon from 'resources/LightbulbOutline';


const DeviceIcon = props => {

    const icons = { 
        'SCENE_TRIGGER':TuneIcon, 
        'ACTIVITY_TRIGGER':ListIcon, 
        'LIGHT':LightbulbOutlineIcon, 
        'BUTTON':TouchAppIcon, 
        'SPEAKER':SpeakerIcon, 
        'THERMOSTAT':DataUsageIcon, 
        'RECEIVER':SpeakerGroupIcon, 
        'TV':TvIcon
    }

    function getIcon(category, size='default') {

        var RealIcon=DeveloperBoardIcon
        if (icons.hasOwnProperty(category)) {
            RealIcon=icons[category]
        }
        return <RealIcon size={size} fontSize={props.fontSize} />
    }

    if (props.displayCategories) {
        return getIcon(props.displayCategories, props.size)
    }

    return getIcon(props.name)

}

export default DeviceIcon

DeviceIcon.defaultProps = {
    size: 'default',
    fontSize: 'default',
}