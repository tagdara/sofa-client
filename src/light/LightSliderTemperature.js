import React from 'react';
import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import SofaSlider from '../SofaSlider';
import AcUnitIcon from '@material-ui/icons/AcUnit';

const useStyles = makeStyles({
        
    indent: {
        paddingLeft: 40,
        paddingRight: 8,
    }
});

export default function LightSliderTemperature(props) {
    
    const [colorTemperatureInKelvin,setColorTemperatureInKelvin] = useState(4000);
    const classes = useStyles();

    useEffect(() => {
        setColorTemperatureInKelvin(props.colorTemperatureInKelvin)
    }, [props.colorTemperatureInKelvin])

    
    function handlePreColorTemperatureChange(value) {
        setColorTemperatureInKelvin(value);
    }; 

    function handleColorTemperatureChange(value) {
        props.sendAlexaCommand('', props.endpointId, "ColorTemperatureController", "SetColorTemperature", { "colorTemperatureInKelvin": value} )
    }; 

    return (
        <ListItem>
            <ListItemIcon className={classes.indent}><AcUnitIcon /></ListItemIcon>
            <SofaSlider
                name="Temperature" smallText={true} unit={"°"}
                value={colorTemperatureInKelvin}
                min={2000} max={7000} step={100}
                preChange={handlePreColorTemperatureChange}
                change={handleColorTemperatureChange}
                disabled={!props.powerState}
            />
        </ListItem>
    );

}


