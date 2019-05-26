import React, { Component, memo } from 'react';
import { useState, useEffect } from 'react';
import { makeStyles, useTheme } from '@material-ui/styles';

import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/lab/Slider';;

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
        marginRight: 8,
        overflowX: "hidden",
        alignItems: "center",
        paddingRight: 8,
    },
    padLeft: {
        paddingLeft: 16,
    },
    slider: {
        padding: "8px 0",
    }

});

export default function SofaAvatarSlider(props) {

    const classes = useStyles();
    
    const [value, setValue] = useState(0);
    const [delay, setDelay] = useState(false);
    const [drag, setDrag] = useState(false);
    const [prechange, setPrechange] = useState(false);
    const [sendPrechange, setSendPrechange] = useState(false);

    useEffect(() => {
  	    setValue(props.value)
    }, [props.value]);

    function handleDrag(event,value) {
        //console.log('handledrag',event.target, value, this.state.drag)
        setDrag(true)
    }

    function handleEndDrag(event, value) {
        setDrag(false)     
        props.change(value)
    }
    
    function handleChange(event,value) {
        setValue(value)
        if (drag) {
            props.preChange(value);
        }
    }; 
    
    return (
        <div style={{ "minWidth": props.minWidth }} className={ props.padLeft ? classes.stack+" "+classes.padLeft: ( props.half ? classes.half : classes.stack) } >
        { props.name ?
            <Typography variant={ props.smallText ? "caption" : "subtitle1" } className={classes.stackLabel} >{props.name}</Typography>
        :   null }
        { props.unit ?
            <Typography variant="caption" className={classes.stackLabel} >{Math.floor(value)+props.unit}</Typography>
        : null }
            <Slider
                classes={{ container: classes.slider }}
                value={value} step={props.step} 
                min={props.min} max={props.max}
                onChange={handleChange}
                onDragEnd={handleEndDrag}
                onDragStart={handleDrag}
                disabled={props.disabled}
            />
        </div>
    );
}

SofaAvatarSlider.defaultProps = {
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
}

