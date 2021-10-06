import React, { useState, useEffect } from 'react';

import { makeStyles } from '@material-ui/styles';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';

import { SketchPicker } from 'react-color'

import { deviceStatesAreEqual, dataFilter } from 'DataContext/DataFilter'

const useStyles = makeStyles({
        
    wide: {
        width: "100%",
    },
    indent: {
        paddingLeft: 16,
        paddingRight: 8,
    },
    button: {
        borderRadius: 24,
        width: 48,
        flexGrow: 0,
    },
    revealIcon: {
        height: 24,
        width: 24,
        color: "#FFE4B5",
    }
});


const sketchPickerStyles = {
    default: {
        picker: { // See the individual picker source for which keys to use
            boxShadow: 'none',
            backgroundColor: "#444",
        },
        swatch: {
            height:248,
        }
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

const decimalToHex = (d)=> {
    var hex = Number(d).toString(16);
    while (hex.length < 2) {
        hex = "0" + hex;
    }
    return hex;
}

export const hsl2rgb = (color) => {
    var r, g, b;
    
    var h=color['hue']
    var s=color['saturation']
    var l=color['brightness']

    if (s === 0){
        r = g = b = l; // achromatic
    } else {
        var hue2rgb = function hue2rgb(p, q, t){
            if(t < 0) t += 1;
            if(t > 1) t -= 1;
            if(t < 1/6) return p + (q - p) * 6 * t;
            if(t < 1/2) return q;
            if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
        }

        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;
        r = hue2rgb(p, q, h + 1/3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1/3);
    }

    console.log("#"+decimalToHex(Math.round(r * 255))+ decimalToHex(Math.round(g * 255))+ decimalToHex(Math.round(b * 255)))
    return "#"+decimalToHex(Math.round(r * 255))+ decimalToHex(Math.round(g * 255))+ decimalToHex(Math.round(b * 255))
}

export const hsv2rgb = (color) => {
    var h=color['hue']/360
    var s=color['saturation']
    var v=color['brightness']


    var r, g, b, i, f, p, q, t;

    i = Math.floor(h * 6);
    f = h * 6 - i;
    p = v * (1 - s);
    q = v * (1 - f * s);
    t = v * (1 - (1 - f) * s);
    switch (i % 6) {
        case 0: r = v; g = t; b = p; break;
        case 1: r = q; g = v; b = p; break;
        case 2: r = p; g = v; b = t; break;
        case 3: r = p; g = q; b = v; break;
        case 4: r = t; g = p; b = v; break;
        case 5: r = v; g = p; b = q; break;
        default:  r = v; g = t; b = p; break;
    }
    
    return "#"+decimalToHex(Math.round(r * 255))+ decimalToHex(Math.round(g * 255))+ decimalToHex(Math.round(b * 255))
    /* eslint no-unused-expressions: 0 */
}
const MultiLightColor = React.memo(props => {

    const classes = useStyles();
    const [openDialog, setOpenDialog] = useState(false);

    useEffect(() => {
        props.addEndpointIds('ids', props.endpointIds, 'MultiLightColor')
        return function cleanup() {
            props.unregisterDevices('MultiLightColor');
        };
    // eslint-disable-next-line 
    }, [])    

    if (!props.deviceStateReady) { return null }

    function currentAverage() {
        var avgHue=0
        var avgSat=0
        var avgBri=0

        for (var light in props.deviceState) {
            var col = props.deviceState[light].ColorController.color.value
            avgHue += col['hue']
            avgSat += col['saturation']           
            if (props.deviceState[light].PowerController.powerState.value==='ON') {
                avgBri+=col['brightness']  
            }
        }
        var count=Object.keys(props.deviceState).length
        avgHue = avgHue/count
        avgSat = avgSat/count
        avgBri = avgBri/count
        var result={"hue": avgHue, "saturation": avgSat, "brightness": avgBri }

        return hsv2rgb(result)
    }

    function closeDialog() {
        setOpenDialog(false)
    }

    function handleColorSliderChange(newcolor, event) {
        var hsb={"hue":newcolor.hsv['h'], "saturation":newcolor.hsv['s'], "brightness":newcolor.hsv['v']};
        
        for (var light in  props.deviceState) {
            hsb.brightness=props.deviceState[light].BrightnessController.brightness.value/100
            props.directive(light, 'ColorController', 'SetColor', { "color" : hsb }, {})
        }
    }
    
    
    return (
        <>
            <Button variant="outlined" size="small" onClick={ () => setOpenDialog(true) } style={{ "backgroundColor": currentAverage() }} className={classes.button }> &nbsp;
            </Button>
            <Dialog open={openDialog} onClose={closeDialog} maxWidth={'md'} fullWidth={false} >
                <SketchPicker
                    width={200} 
                    disableAlpha styles={sketchPickerStyles}
                    color={ currentAverage() }
                    onChangeComplete={ handleColorSliderChange }
                    presetColors= { [   '#D0021B', '#F5A623', '#F8E71C', '#8B572A', 
                                        '#7ED321', '#417505', '#BD10E0', '#9013FE', 
                                        '#4A90E2', '#50E3C2', '#B8E986', '#FFFFFF', "#FEEBBA"
                                    ] }
                />
                <DialogActions>
                    <Button onClick={closeDialog} color="primary">
                        OK
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );

}, deviceStatesAreEqual);

export default dataFilter(MultiLightColor)

