import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { useTheme } from "@material-ui/core/styles";
import IconButton from '@material-ui/core/IconButton';
import LensIcon from '@material-ui/icons/Lens';
import TripOriginIcon from '@material-ui/icons/RadioButtonUnchecked';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles(theme => {
    return {
        baseOn: {
            height: 48,
            width: 48,
            boxSizing: "border-box",
            opacity: 1,
            color: theme.palette.dot.on,
            zIndex: 6,
        },
        baseOff: {
            height: 48,
            width: 48,
            boxSizing: "border-box",
            opacity: 1,
            color: theme.palette.dot.off,
            zIndex: 5,
        },
        line: {
                position: "absolute",
                right: "calc(50% + 6px)",
                top: "calc(50% - 1px)",
                height: 2,
                width: "calc(100% - 13px)",
                display: "block",
                zIndex:1,
                opacity: 1,
        },
        onLine: {
                position: "absolute",
                right: "calc(50% + 6px)",
                top: "calc(50% - 1px)",
                height: 2,
                background: theme.palette.dot.on,
                width: "calc(100% - 13px)",
                display: "block",
                zIndex:1,
                opacity: 1,
        },
        offLine: {
                position: "absolute",
                right: "calc(50% + 6px)",
                top: "calc(50% - 1px)",
                height: 1,
                background: theme.palette.dot.off,
                content: "",
                width: "calc(100% - 13px)",
                display: "block",
                zIndex:1,
                opacity: 1,
        },
        moreLine: {
                position: "absolute",
                right: "calc(50% + 6px)",
                top: "calc(50% - 1px)",
                height: 1,
                background: theme.palette.dot.off,
                content: "",
                width: "calc(100% - 13px)",
                display: "block",
                zIndex:1,
                opacity: 1,
        },
    
        selectedIcon: {
            height: 24,
            width: 24,
            zIndex: 140,
        },
        selectedZero: {
            height: 20,
            width: 20,
        },
        zeroIcon: {
            margin: 6,
            height: 10,
            width: 10,
            zIndex: 40,
        },
        smallIcon: {
            margin: 8,
            height: 8,
            width: 8,
            zIndex: 140,
            opacity: 1,
        },
        working: {
            margin: 0,
        },
        holder: {
            position: "relative",
            minWidth: 192,
            padding: 0,
            boxSizing: "border-box",
            margin: 0,
            zIndex: 2,
        }
    }
});

export default function DotLevel(props) {
    
    const classes = useStyles();
    const theme = useTheme();
    const levels = [0,1,2,3]
    const [level,setLevel] = useState(props.level);
    const [working,setWorking] = useState(false);

    useEffect(() => {
        setLevel(props.level)
        setWorking(false)
    }, [props.level])
    
    function applyLevel(lev) {
        setWorking(true)
        setLevel(lev)
        props.select(lev)
    }
    
    function getColorClass(lev, level) {
        if (level===0) { return theme.palette.dot.off }
        if (lev<= level) { return theme.palette.dot.on }
        return theme.palette.dot.more
    }

    return (
        <div className={classes.holder} >
            { levels.map((lev) =>
            <IconButton size={"small"} key={lev} onClick={ () => applyLevel(lev) } className={ ( level>0 && lev<=level ) ? classes.baseOn : classes.baseOff}>
                { lev===0  ?
                <>
                    { working && lev===level ?
                        <CircularProgress size={24} className={classes.working} />
                    :
                        <TripOriginIcon className={ lev===level ? classes.selectedZero : classes.zeroIcon} />
                    }
                </>
                :
                <>
                    <div style={{ backgroundColor: getColorClass(lev, level) }} className={classes.line}></div>
                    { (working && lev===level) ?
                        <CircularProgress size={24} className={classes.working} />
                    :
                    <>
                        { lev===level ?
                            <LensIcon style={{ color: getColorClass(lev, level) }} className={ classes.selectedIcon} />
                        :
                            <LensIcon style={{  color: getColorClass(lev, level), width: 8+(lev*2), height: 8+(lev*2), margin: 0 }} className={ classes.smallIcon} />
                        }
                    </>
                    }
                    <div style={{ width : "calc(100% - "+(15-lev*2)+"px)", backgroundColor: getColorClass(lev, level) }} className={classes.line}></div>
                </>
                }
            </IconButton>
            )}
        </div >
    );
}


