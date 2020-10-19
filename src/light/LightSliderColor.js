import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import LensIcon from '@material-ui/icons/Lens';

import { SketchPicker } from 'react-color'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';

const useStyles = makeStyles({
        
    wide: {
        width: "100%",
    },
    indent: {
        paddingLeft: 16,
        paddingRight: 8,
    },
    button: {
        height: 20,
        minWidth: 48,
        flexGrow: 1,
        marginRight:4,
    },
    revealIcon: {
        height: 24,
        width: 24,
        color: "#FFE4B5",
    },
    smallText: {
        fontSize: 12,
    }
});


const sketchPickerStyles = {
    default: {
        picker: { // See the individual picker source for which keys to use
            boxShadow: 'none',
        },
    },
}

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
    const [openDialog, setOpenDialog] = useState(false);
    
    useEffect(() => {
        setColor(sb2sl(props.deviceState.ColorController.color.value))
    }, [props.deviceState.ColorController.color.value]);

    function gethsl(sl) {
        if (sl) {
            return { "backgroundColor":"hsl("+sl['h']+", "+(sl['s']*100)+"%, "+(sl['l']*100)+"%)"}
        }
        return { "backgroundColor":"hsl(255, 100%, 100%)"}
    }
    
    function closeDialog() {
        setOpenDialog(false)
    }

    function handleColorSliderChange(color, event) {
        setColor(color.hsl);
        var sendsb=sl2sb(color.hsl)
        //sendsb.brightness=props.device.BrightnessController.brightness.value/100
        props.directive(props.device.endpointId, "ColorController", "SetColor", { "color": sendsb })
    }

    function handleColorChange(hsb) {
        setColor(sb2sl(hsb));
        hsb.brightness=props.deviceState.BrightnessController.brightness.value/100
        props.directive(props.device.endpointId, "ColorController", "SetColor", { "color": hsb })
    }
    
    function saveColor() { 
        var sendsb=sl2sb(color)
        props.directive(props.device.endpointId, 'ColorController', 'SetColor', { "color" : sendsb }, {})
        setOpenDialog(false)
    }

    return (
        <ListItem>
            <ListItemText classes={{primary:classes.smallText}} primary={"Color"} />
            <Button variant="outlined" size="small" onClick={ () => setOpenDialog(true) } style={gethsl(color)} className={classes.button }> &nbsp;
            </Button>
            <Dialog open={openDialog} close={closeDialog} maxWidth={'xs'} fullWidth={false} >
                <SketchPicker
                    disableAlpha styles={sketchPickerStyles}
                    color={ color }
                    onChangeComplete={ handleColorSliderChange }
                    presetColors= { [   '#D0021B', '#F5A623', '#F8E71C', '#8B572A', 
                                        '#7ED321', '#417505', '#BD10E0', '#9013FE', 
                                        '#4A90E2', '#50E3C2', '#B8E986', '#FFFFFF', "#FEEBBA"
                                    ] }
                />
                <DialogActions>
                    <Button onClick={saveColor} color="primary">
                        OK
                    </Button>
                </DialogActions>
            </Dialog>
            <IconButton size="small" onClick={ () => handleColorChange(reveal)} color={ color===reveal ? "primary" : "default"} >
                <LensIcon className={classes.revealIcon} />
            </IconButton>
        </ListItem>
    );

}

