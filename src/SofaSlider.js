import React from 'react';
import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

const useStyles = makeStyles({
         
    half: {
        alignItems: "center",
        display: "flex",
        height: 42,
        flexGrow: 1,
        flexBasis: 0,
        boxSizing: "border-box",
    },
    stack: {
        height: "auto",
        display: "flex",
        flexGrow: 1,
        justifyContent: "space-between",
        flexWrap: "wrap",
        width: "100%",
        boxSizing: "border-box",
        marginRight: 0,
        //overflowX: "hidden",
        //overflowY: "hidden",
        alignItems: "center",
        paddingRight: 8,
    },
    padLeft: {
        paddingLeft: 16,
    },
    slider: {
        margin: "-18px"
    }

});

export default function SofaSlider(props) {
    
    const classes = useStyles();
    const [value, setValue] = useState(props.value)
    
    useEffect(() => {
        if (props.value) {
            setValue(props.value)
        }
    }, [props.value]);

    
    function handlePreChange(event, value) {
        setValue(value);
        if (props.preChange) {
            props.preChange(value);
        }
    }; 

    function handleChange(event,value) {
        props.change(value);
    }; 
   
    function unitDisplay() {
        if (Array.isArray(value)) {
            return Math.floor(value[0])+' - '+ Math.floor(value[1])+props.unit
        } else {
            return Math.floor(value)+props.unit
        }
    }
   
    return (
        <div style={{ "minWidth": props.minWidth }} className={ props.padLeft ? classes.stack+" "+classes.padLeft: ( props.half ? classes.half : classes.stack) } >
        { props.name ?
            <Typography variant={ props.smallText ? "caption" : "subtitle1" } className={classes.stackLabel} >{props.name}</Typography>
        :   null }
        { props.unit ?
            <Typography variant="caption" className={classes.stackLabel} >{unitDisplay()}</Typography>
        : null }
            <Slider
                value={value} step={props.step} 
                min={props.min} max={props.max}
                onChange={handlePreChange}
                onChangeCommitted={handleChange}
                disabled={props.disabled}
                valueLabelDisplay={props.tooltip}
            />
        </div>
    );
}

SofaSlider.defaultProps = {
    name: '',
    unit: '',
    min: 0,
    max: 100,
    step: 1,
    default: 0,
    value: 0,
    tabs: '',
    disabled: false,
    padLeft: false,
    half: false,
    minWidth: 240,
    smallText: false,
    tooltip: "auto",
}


