import React, { useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import Slider from '@mui/material/Slider';

const useStyles = makeStyles(theme => {
    return {
        holder: {
            position: "relative",
            padding: 16,
            boxSizing: "border-box",
            margin: 0,
            zIndex: 2,
            display: "flex",
            flexGrow: 2,
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
            '& .MuiSlider-mark': {
                backgroundColor: theme.palette.primary.main,
                height: 4,
                width: 4,
                '&.MuiSlider-markActive': {
                    opacity: 1,
                    backgroundColor: 'currentColor',
                },
                '&[data-index="0"]': {
                    backgroundColor: "rgba(0,0,0,0)",
                    borderRadius: "50%",
                    borderWidth: 2,
                    borderStyle: "solid",
                    borderColor: theme.palette.primary.main,
                    height: 8,
                    width: 8,
                    marginLeft: -6,
                }
            },
            '& .MuiSlider-thumb': {
                height: 20,
                width: 20,
                backgroundColor: theme.palette.primary.main,
            },
        },
        offSlider: {
            color: theme.palette.action.disabled,
            height: 2,
            '& .MuiSlider-track': {
                height: 2,
                border: 'none',
                marginLeft: 8,
                width: "calc(100% - 8px)",
            },
            '& .MuiSlider-rail': {
                height: 2,
                opacity: 0.5,
                marginLeft: 8,
                width: "calc(100% - 8px)",
                backgroundColor: theme.palette.action.disabled,
            },
            '& .MuiSlider-mark': {
                backgroundColor: theme.palette.action.disabled,
                height: 4,
                width: 4,
                '&.MuiSlider-markActive': {
                    opacity: 1,
                    backgroundColor: 'currentColor',
                },
                '&[data-index="0"]': {
                    backgroundColor: "rgba(0,0,0,0)",
                    borderRadius: "50%",
                    borderWidth: 2,
                    borderStyle: "solid",
                    borderColor: theme.palette.action.disabled,
                    height: 16,
                    width: 16,
                    marginLeft: -10,
                }
            },
            '& .MuiSlider-thumb': {
                height: 1,
                width: 1,
                opacity: 0,
                backgroundColor: theme.palette.action.disabled,
            },
        }
    }
});


export default function DotSlider(props) {
    
    const max = props.levels ? props.levels.length-1 : 1
    const currentLevel = props.levels.includes(props.level) ? props.levels.indexOf(props.level) : 0
    const [ level, setLevel ] = useState( currentLevel );
    const on = level > 0
    const classes = useStyles();

    useEffect(() => {
        setLevel(currentLevel)
    // eslint-disable-next-line 
    }, [ currentLevel ])
    
    function applyLevel(event, lev) {
        console.log('apply lev',lev, event)
        setLevel(lev)
        props.select(props.levels[lev])
    }

    function applyTempLevel(lev) {
        console.log('apply temp lev',lev)
        setLevel(lev)
    }

    return (
            <div className={classes.holder} >
                <Slider
                    className={ on ? classes.onSlider : classes.offSlider }
                    step={1}
                    marks
                    min = {0}
                    max={ max }
                    valueLabelDisplay="off"
                    onChange = { (e, lev) => applyTempLevel(lev) } 
                    onChangeCommitted = { applyLevel } 
                    value = { level }
                    disabled = {props.disabled}
                    level = { level }
                />
            </div>
    );
}