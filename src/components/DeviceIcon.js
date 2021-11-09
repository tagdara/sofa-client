import React from 'react';

import DataUsageIcon from '@mui/icons-material/DataUsage';
import DeveloperBoardIcon from '@mui/icons-material/DeveloperBoard';
import SpeakerIcon from '@mui/icons-material/Speaker';
import SpeakerGroupIcon from '@mui/icons-material/SpeakerGroup';
import TouchAppIcon from '@mui/icons-material/TouchApp';
import TuneIcon from '@mui/icons-material/Tune';
import ListIcon from '@mui/icons-material/List';
import TvIcon from '@mui/icons-material/Tv';
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