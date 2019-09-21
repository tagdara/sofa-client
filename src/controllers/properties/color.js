import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import { SketchPicker } from 'react-color'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';

const useStyles = makeStyles({
        
    wide: {
        width: "100%",
    },
    indent: {
        paddingLeft: 40,
        paddingRight: 8,
    },
    button: {
        minWidth: 96,
        minHeight: 39,
    },
    revealIcon: {
        height: 24,
        width: 24,
        color: "FFE4B5",
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

export default function Color(props) {
    
    console.log(props.interface.color.value, props.interface)


    const classes = useStyles();
    const [color, setColor] = useState(props.interface.color.value);
    const [openDialog, setOpenDialog] = useState(false);
    
    useEffect(() => {
        const reveal = {hue: 43.5, saturation:0.27, brightness: 1}
        
        if (props.interface.color.value===undefined) {
            setColor(sb2sl(reveal))
        } else {
            //setColor(sb2sl(props.interface.color.value.color))
            setColor(sb2sl(props.interface.color.value))
        }

    }, [props.interface.color.value]);


    function handleColorSliderChange(color, event) {
        setColor(color.hsl);
        if (props.live===true) {
            var sendsb=sl2sb(color)
            props.interface.directive('SetColor',{ "color": sendsb })
        }
    }

    function gethsl(sl) {
        if (sl) {
            return { "backgroundColor":"hsl("+sl['h']+", "+(sl['s']*100)+"%, "+(sl['l']*100)+"%)"}
        }
        return { "backgroundColor":"hsl(255, 100%, 100%)"}
    }
    
    function closeDialog() {
        setOpenDialog(false)
    }
    
    function saveColor() { 
        var sendsb=sl2sb(color)
        props.interface.directive('SetColor',{ "color": sendsb })
        setOpenDialog(false)
    }

    return (
        <>
            <Button variant="outlined" size="small" onClick={ () => setOpenDialog(true) } style={gethsl(color)} className={classes.button }> &nbsp;
            </Button>
            <Dialog open={openDialog} close={closeDialog} maxWidth={'xs'} fullWidth={false} >
                <SketchPicker
                    disableAlpha styles={sketchPickerStyles}
                    color={ color }
                    onChangeComplete={ handleColorSliderChange }
                />
                <DialogActions>
                    <Button onClick={closeDialog} color="primary">
                        CANCEL
                    </Button>
                    <Button onClick={saveColor} color="primary">
                        OK
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

Color.defaultProps = {
    live: false
}

