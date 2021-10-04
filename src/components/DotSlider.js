import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import Slider from '@material-ui/core/Slider';

const useStyles = makeStyles(theme => {
    return {
        holder: {
            position: "relative",
            minWidth: 192,
            padding: 0,
            boxSizing: "border-box",
            margin: 0,
            zIndex: 2,
        },
        centeredHolder: {
            display: "flex",
            width: "100%",
            maxWidth: "100%",
            position: "relative",
            minWidth: 192,
            padding: "0px 28px 8px 28px",
            boxSizing: "border-box",
            margin: 0,
            zIndex: 2,
            justifyContent: "center",
        },
    }
});

export default function DotSlider(props) {
    
    const classes = useStyles();
    const [ level, setLevel ] = useState( props.value );

    function makeLevels() {
        if (!props.levelValues) { return [{ "value": 0, "label": 0 }, { "value": 100, "label": 100 }] }
        var all_levels=[]
        for (var i = 0; i < props.levelValues.length; i++) {
            all_levels.push({ "value": props.levelValues[i], "label": props.levelValues[i] })
        }
        return all_levels
    }

    useEffect(() => {
        setLevel(props.value)
    // eslint-disable-next-line 
    }, [ props.value ])
    
    function applyLevel(event, lev) {
        setLevel(lev)
        props.select(lev)
    }

    function applyTempLevel(event, lev) {
        setLevel(lev)
    }

    
    return (
        <div className={props.centered ? classes.centeredHolder : classes.holder} >
            <Slider
                    defaultValue={props.value}
                    aria-labelledby="discrete-slider-custom"
                    step={ props.levelValues ? null : 1 }
                    min={ props.levelValues ? props.levelValues[0] : 0 }
                    max={ props.levelValues ? props.levelValues[props.levelValues.length-1] : 100 }
                    valueLabelDisplay="off"
                    marks={ makeLevels() }
                    onChange={ applyTempLevel } 
                    onChangeCommitted={ applyLevel } 
                    value={level}
                    disabled={props.disabled}
                  />
        </div >
    );
}