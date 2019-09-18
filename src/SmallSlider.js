import React , { useState, useEffect } from 'react';
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
        paddingLeft: 8,
    }

});

export default function SmallSlider(props) {
    
    const classes = useStyles();
    const [value, setValue] = useState(props.value)
    
    useEffect(() => {
        setValue(props.value)
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
        <>
            <Slider
                className={classes.small}
                value={value} step={props.step} 
                min={props.min} max={props.max}
                onChange={handlePreChange}
                onChangeCommitted={handleChange}
                disabled={props.disabled}
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

