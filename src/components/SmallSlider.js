import React , { useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';

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
        margin: "-18px"
    },
    small: {
        padding: 3,
    },
    smallLabel: {
        paddingLeft: 16,
    }

});

export default function SmallSlider(props) {
    
    const classes = useStyles();
    const [val, setVal] = useState(props.value)
    
    useEffect(() => {
        setVal(props.value)
    }, [props.value]);

    
    function handlePreChange(event, newval) {
        setVal(newval);
        if (props.preChange) {
            props.preChange(newval);
        }
    }; 

    function handleChange(event,newval) {
        props.change(newval);
    }; 
   
    function unitDisplay() {
        if (Array.isArray(val)) {
            return Math.floor(val[0])+' - '+ Math.floor(val[1])+props.unit
        } else {
            return Math.floor(val)+props.unit
        }
    }
    
    return (
        <>
            <Slider
                className={classes.small}
                value={ val===undefined ? 0 : val } step={props.step} 
                min={props.min} max={props.max}
                onChange={handlePreChange}
                onChangeCommitted={handleChange}
                disabled={ val===undefined || props.disabled }
            />
            { props.unit ?
                <Typography variant="caption" className={classes.smallLabel} >{unitDisplay()}</Typography>
            : null }
        </>
    );
}

SmallSlider.defaultProps = {
    unit: '',
    min: 0,
    max: 100,
    step: 1,
    default: 0,
    value: 0,
    disabled: false,
}


