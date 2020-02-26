import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';

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
        },
        baseOff: {
            height: 48,
            width: 48,
            boxSizing: "border-box",
            opacity: 1,
            color: theme.palette.dot.off,
        },
        onLine: {
                position: "absolute",
                right: "calc(50% + 6px)",
                top: "calc(50% - 1px)",
                height: 2,
                background: theme.palette.dot.on,
                width: "calc(100% - 13px)",
                display: "block",
                zIndex:-1,
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
                zIndex:-1,
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
        }
    }
});

export default function DotLevel(props) {
    
    const classes = useStyles();
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

    return (
        <React.Fragment >
            { levels.map((lev) =>
            <IconButton key={lev} onClick={ () => applyLevel(lev) } className={ ( level>0 && lev<=level ) ? classes.baseOn : classes.baseOff}>
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
                    <div className={lev<=level ? classes.onLine: classes.offLine}></div>
                    { (working && lev===level) ?
                        <CircularProgress size={24} className={classes.working} />
                    :
                    <>
                        { lev===level ?
                            <LensIcon className={ classes.selectedIcon} />
                        :
                            <LensIcon style={{  width: 8+(lev*2), height: 8+(lev*2), margin: 0 }} className={ classes.smallIcon} />
                        }
                    </>
                    }
                    <div style={{ width : "calc(100% - "+(15-lev*2)+"px)" }} className={lev<=level ? classes.onLine: classes.offLine}></div>
                </>
                }
            </IconButton>
            )}
        </React.Fragment >
    );
}


