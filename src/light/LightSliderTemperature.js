import React from 'react';
import { makeStyles } from '@material-ui/styles';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';

import SofaSlider from '../SofaSlider';
import AcUnitIcon from '@material-ui/icons/AcUnit';

const useStyles = makeStyles({
        
    indent: {
        paddingLeft: 16,
        paddingRight: 8,
    }
});

export default function LightSliderTemperature(props) {

    const classes = useStyles();

    function handleColorTemperatureChange(value) {
        props.directive(props.device.endpointId, "ColorTemperatureController", "SetColorTemperature", { "colorTemperatureInKelvin": value} )
    }; 

    return (
        <ListItem>
            <ListItemIcon className={classes.indent}><AcUnitIcon /></ListItemIcon>
            <SofaSlider
                name="Temperature" smallText={true} unit={"°"}
                value={props.deviceState.ColorTemperatureController.colorTemperatureInKelvin.value}
                min={2000} max={7000} step={100}
                change={handleColorTemperatureChange}
                disabled={!props.powerState}
            />
        </ListItem>
    );

}


