import React, { useContext } from 'react';
import { LayoutContext } from '../layout/NewLayoutProvider';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import GridItem from '../GridItem'
import ToggleAvatar from '../ToggleAvatar';
import EqualizerIcon from '@material-ui/icons/Equalizer';

export default function AirQuality(props) { 
    
    const { applyLayoutCard } = useContext(LayoutContext);
    
    function showThermostats() {
        applyLayoutCard('ThermostatLayout')
    }
    
    return (
        
        <GridItem wide={props.wide} >
            <ListItem onClick={showThermostats}>
                <ToggleAvatar avatarState={ props.deviceState['Air Quality'].mode.value }>
                    <EqualizerIcon />
                </ToggleAvatar>
                <ListItemText primary={'Air Quality: '+props.deviceState['Air Quality'].mode.value} />
           </ListItem>
        </GridItem>
    );
}

