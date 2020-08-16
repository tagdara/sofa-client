import React from 'react';
import { makeStyles } from '@material-ui/styles';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import SofaSlider from '../SofaSlider';
import BrightnessLowIcon from '@material-ui/icons/BrightnessLow';

const useStyles = makeStyles({
        
    indent: {
        paddingLeft: 16,
        paddingRight: 8,
    }
});

export default function LightSliderBrightness(props) {
    
    const classes = useStyles();

    function handleBrightnessChange(event) {
        props.directive(props.device.endpointId,'BrightnessController', 'SetBrightness', { "brightness" : event })
    }; 

    return (
            <ListItem>
                <ListItemIcon className={classes.indent}><BrightnessLowIcon /></ListItemIcon>
                <SofaSlider
                    name="Brightness" smallText={true} value={props.deviceState.BrightnessController.brightness.value} unit="%"
                    min={0} max={100} step={10}
                    change={handleBrightnessChange}
                    disabled={!props.deviceState.PowerController.powerState.value}
                />
            </ListItem>
    );
}

