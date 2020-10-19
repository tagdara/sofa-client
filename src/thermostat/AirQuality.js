import React, { useContext } from 'react';
import { LayoutContext } from '../layout/NewLayoutProvider';
import { DataContext } from '../DataContext/DataProvider';

import SofaListItem from '../SofaListItem';
import CardBase from '../CardBase'
import EqualizerIcon from '@material-ui/icons/Equalizer';


export default function AirQuality(props) { 
    
    const { selectPage } = useContext(LayoutContext);
    const { modeDisplayName } = useContext(DataContext);
    
    function aqValueName() {
        try {
            return modeDisplayName(props.device,'Thermostat.Air Quality',props.deviceState['Air Quality'].mode.value)
        }
        catch {
            return props.deviceState['Air Quality'].mode.value
        }
    }
    
    return (
        
        <CardBase >
            <SofaListItem   avatar={<EqualizerIcon />} onClick={() => selectPage('ThermostatLayout')} avatarState={ aqValueName() }
                            primary={'Air Quality: '+aqValueName() } />
        </CardBase>
    );
}

