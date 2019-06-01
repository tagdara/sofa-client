import React from 'react';
import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import SofaSlider from '../SofaSlider';
import BrightnessLowIcon from '@material-ui/icons/BrightnessLow';

const useStyles = makeStyles({
        
    indent: {
        paddingLeft: 40,
        paddingRight: 8,
    }
});

export default function LightSliderBrightness(props) {
    
    const [brightness,setBrightness] = useState(50);
    const classes = useStyles();

    useEffect(() => {
        setBrightness(props.brightness)
    }, [props.brightness])

    
    function handlePreBrightnessChange(event, value) {
        setBrightness(event);
    }; 

    function handleBrightnessChange(event) {
        props.sendAlexaCommand('', props.endpointId, "BrightnessController", "SetBrightness", { "brightness" : event } )
    }; 

    return (
            <ListItem>
                <ListItemIcon className={classes.indent}><BrightnessLowIcon /></ListItemIcon>
                <SofaSlider
                    name="Brightness" smallText={true} value={brightness} unit="%"
                    min={0} max={100} step={10}
                    preChange={handlePreBrightnessChange}
                    change={handleBrightnessChange}
                    disabled={!props.powerState}
                />
            </ListItem>
    );
}

