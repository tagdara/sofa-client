import React from 'react';
import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';

import CloseIcon from '@material-ui/icons/Close';
import ColorLensIcon from '@material-ui/icons/ColorLens';
import LensIcon from '@material-ui/icons/Lens';

import { HuePicker } from 'react-color';

const useStyles = makeStyles({
        
    root: {
        width: '100%',
        display: 'flex',
        flexWrap: 'wrap',
    },
    expansionList: {
        paddingLeft: 4,
        paddingRight: 4,
        
    },
    halves: {
        width: '40%',
    },

    halfSlider: {
        width: '40%',
        paddingLeft: 16,
        paddingRight: 16,
        display: 'flex',
        flex: 1,
    },

    stackedLightControl: {
        paddingLeft: 16,
        paddingRight: 16,
        flex:1,
    },
    buttonsAndSlider: {
        paddingTop: 0,
        paddingRight: 28,
        paddingLeft: 10,
    },
    nameAndSwitch: {
        display: "flex",
        paddingRight: 0,
        paddingLeft: 10,
        alignItems: "center",
    },
    deviceName: {
        flex: 1,
    },
    listItemLabel: {
        paddingBottom: 0,
    },
    paperLight: {
        display: "flex",
        alignItems: "center",
        paddingLeft: 16,
    },
    chipLine: {
        paddingTop:0,
        paddingLeft:8,
        paddingRight:8,
    },
    wide: {
        width: "100%",
    },
    indent: {
        paddingLeft: 40,
    },
    button: {
        minWidth: 24
    },
    revealIcon: {
        height: 24,
        width: 24,
        color: "FFE4B5",
    }
});

export const sl2sb = (color) => {
    var SL = {h:color.h, s:color.s, l:color.l};
    var SB = {hue:color.h, saturation:0, brightness:0};
    var t = SL.s * (SL.l<0.5 ? SL.l : 1-SL.l);
    SB.brightness = SL.l+t;
    SB.saturation = SL.l>0 ? 2*t/SB.brightness : SB.saturation ;
    return SB
}    

export const sb2sl = (color) => {
    var SB = {hue:color.hue, saturation:color.saturation, brightness:color.brightness};
    var SL = {h:color.hue, s:0, l:0};
    SL.l = (2 - SB.saturation) * SB.brightness / 2;
    SL.s = SL.l&&SL.l<1 ? SB.saturation*SB.brightness/(SL.l<0.5 ? SL.l*2 : 2-SL.l*2) : SL.s;
    return SL
}

export default function LightSliderColor(props) {

    const classes = useStyles();
    const reveal = {hue: 43.5, saturation:0.27, brightness: 1}
    const [delaySet, setDelaySet] = useState(false);
    const [prevColor, setPrevColor] = useState({});
    const [color, setColor] = useState(reveal);
    const [delayTimer, setDelayTimer] = useState(null);
    
    useEffect(() => {
        if (!delaySet) {
            setColor(sb2sl(props.color))
        }
    }, [props.color]);


    function handleColorSliderChange(color, event) {
        console.log('sliderchange')
        delaySliderUpdates()    // hue bulbs are slow on HSB
        setColor(color.hsl);
        var sendsb=sl2sb(color.hsl)
        sendsb.brightness=props.brightness/100
        props.sendAlexaCommand(props.name, props.endpointId, "ColorController", "SetColor", { "color": sendsb } )
    }

    function handleColorChange(hsb) {
        console.log('colorchange')
        delaySliderUpdates()   // hue bulbs are slow on HSB
        setColor(sb2sl(hsb));
        hsb.brightness=props.brightness/100
        props.sendAlexaCommand(props.name, props.endpointId, "ColorController", "SetColor", {"color":hsb} )
    }
    
    function delaySliderUpdates() {
        setDelaySet(true)
        if (delayTimer) {
            clearTimeout(delayTimer)
        }
        var timer = () => setTimeout(() => endSliderDelay(), 20000)
        setDelayTimer(timer)
        setDelaySet(true)
    }
    
    function endSliderDelay() {
        setDelaySet(false);
        setColor(sb2sl(props.color))
    }

    return (
        <ListItem>
            <ListItemIcon className={classes.indent}><ColorLensIcon /></ListItemIcon>
            <HuePicker
                className={classes.wide}
                color={ color }
                onChangeComplete={ handleColorSliderChange }
            />
            <Button size="small" onClick={ () => handleColorChange(reveal)} color={ color==reveal ? "primary" : "default"} className={classes.button }>
                <LensIcon className={classes.revealIcon} />
            </Button>
        </ListItem>
    );

}

