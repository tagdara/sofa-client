import React, { useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles';

import Button from '@mui/material/Button';
import LensIcon from '@mui/icons-material/Lens';

import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { HuePicker } from 'react-color';

const useStyles = makeStyles({
        
    wide: {
        width: "100%",
    },
    indent: {
        paddingLeft: 40,
        paddingRight: 8,
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
    const [color, setColor] = useState(reveal);
    
    useEffect(() => {
        setColor(sb2sl(props.interface.color.value))
    }, [props.interface.color.value]);


    function handleColorSliderChange(color, event) {
        setColor(color.hsl);
        var sendsb=sl2sb(color.hsl)
        sendsb.brightness=props.device.BrightnessController.brightness.value/100
        props.interface.directive('SetColor',{ "color": sendsb })
    }

    function handleColorChange(hsb) {
        setColor(sb2sl(hsb));
        hsb.brightness=props.device.BrightnessController.brightness.value/100
        props.interface.directive('SetColor',{ "color": hsb })
    }

    return (
        <TableRow>
            <TableCell>
                Color
            </TableCell>
            <TableCell>
                <Button size="small" onClick={ () => handleColorChange(reveal)} color={ color===reveal ? "primary" : "default"} className={classes.button }>
                    <LensIcon className={classes.revealIcon} />
                </Button>
            </TableCell>
            <TableCell className={classes.nobreak} >
                <HuePicker
                    className={classes.wide}
                    color={ color }
                    onChangeComplete={ handleColorSliderChange }
                />
            </TableCell>
        </TableRow>
    );

}

