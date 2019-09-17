import React from 'react';
import { makeStyles } from '@material-ui/styles';
import SmallSlider from '../../SmallSlider';

const useStyles = makeStyles({
        
    indent: {
        paddingLeft: 40,
        paddingRight: 8,
    },
    nobreak: {
        whiteSpace: "nowrap",
        alignItems: "center",
    }
});

export default function Brightness(props) {
    
    const classes = useStyles();

    function handleBrightnessChange(event) {
        props.interface.directive('SetBrightness', { "brightness" : event })
    }; 

    return (
        <SmallSlider
            value={props.interface.brightness.value===null ? 50 : props.interface.brightness.value }
            min={0} max={100} step={10}
            change={ props.changeValue }
            disabled={!props.device.PowerController.powerState.value}
        />
    );
}

