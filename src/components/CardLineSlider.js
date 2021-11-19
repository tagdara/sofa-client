import React, { useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import Slider from '@mui/material/Slider';

const useStyles = makeStyles(theme => {
    return {
        holder: {
            position: "relative",
            padding: "0 8px",
            boxSizing: "border-box",
            margin: 0,
            zIndex: 2,
            display: "flex",
            flexGrow: 1,
            minWidth: "50%",
        },
        onSlider: {
            color: theme.palette.primary.main,
            height: 2,
            '& .MuiSlider-track': {
                height: 2,
                border: 'none',
                marginLeft: 4,
                width: "calc(100% - 4px)",
            },
            '& .MuiSlider-rail': {
                height: 2,
                opacity: 0.5,
                marginLeft: 4,
                width: "calc(100% - 4px)",
                backgroundColor: theme.palette.primary.dark,
            },
            '& .MuiSlider-thumb': {
                height: 20,
                width: 20,
                backgroundColor: theme.palette.primary.main,
                '&:before, &:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
                    boxShadow: '0 !important',
                },
            },
        },
        offSlider: {
            //color: theme.palette.action.disabled,
            height: 2,
            '& .MuiSlider-track': {
                height: 2,
                border: 'none',
                marginLeft: 4,
                backgroundColor: theme.palette.action.disabled,
            },
            '& .MuiSlider-rail': {
                height: 2,
                opacity: 0.5,
                marginLeft: 4,
                width: "calc(100% - 8px)",
                backgroundColor: theme.palette.action.disabled,
            },
            '& .MuiSlider-thumb': {
                opacity: "!important",
                height: 8,
                width: 8,
                '&:before, &:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
                    boxShadow: '0 !important',
                },
                //backgroundColor: theme.palette.action.disabled,
            },
        }
    }
});

const CardLineSlider = props => {
    
    const [ value, setValue ] = useState( props.value );
    const on = (props.on !== undefined) ? props.on : value > 0
    const classes = useStyles();

    useEffect(() => {
        setValue(props.value)
    // eslint-disable-next-line 
    }, [ props.value ])
    
    function applyValue(finalValue) {
        setValue(finalValue)
        if (props.set) {
            props.set(finalValue)
        }
    }

    function applyTempValue(tempValue) {
        setValue(tempValue)
        if (props.slide) {
            props.slide(tempValue)
        }
    }

    return (
        <div className={classes.holder} sx={{ width : props.width }}>
            <Slider
                className={ on ? classes.onSlider : classes.offSlider }
                min = {props.min ? props.min : 0 }
                max={ props.max ? props.max : 100 }
                valueLabelDisplay="off"
                onChange = { (e, lev) => applyTempValue(lev) } 
                onChangeCommitted = { (e, lev) => applyValue(lev) } 
                disabled = { !on }
                value = { value }
            />
        </div>
    );
}

export default CardLineSlider;