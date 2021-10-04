import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';

import IconButton from '@material-ui/core/IconButton';
import LensIcon from '@material-ui/icons/Lens';
import TripOriginIcon from '@material-ui/icons/RadioButtonUnchecked';
import CircularProgress from '@material-ui/core/CircularProgress';
import ToggleAvatar from 'components/ToggleAvatar'

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
        onLine: {
                position: "absolute",
                right: "calc(50% + 6px)",
                top: "calc(50% - 1px)",
                height: 2,
                background: theme.palette.dot.on,
                width: "calc(100% - 4px)",
                display: "block",
                zIndex:2,
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
        },
        centeredHolder: {
            display: "flex",
            width: "100%",
            position: "relative",
            minWidth: 192,
            padding: 0,
            boxSizing: "border-box",
            margin: 0,
            zIndex: 2,
            justifyContent: "center",
        }
    }
});

export default function DotAvatar(props) {
    
    const classes = useStyles();
    const levels = makeLevels()
    const [level,setLevel] = useState(props.level);
    const [working,setWorking] = useState(false);

    function makeLevels() {
        var all_levels=[]
        for (var i = 0; i < props.levelValues.length; i++) {
            all_levels.push(i)
        }
        return all_levels
    }

    useEffect(() => {
        if (props.levelValues.includes(props.value)) {
            setLevel(props.levelValues.indexOf(props.value))
        }
        //setLevel(props.level)
        setWorking(false)
        setLevel(closestLevel())
    // eslint-disable-next-line 
    }, [props.levelValues, props.value])
    
    function applyLevel(lev) {
        setWorking(true)
        setLevel(lev)
        props.select(props.levelValues[lev])
    }
    
    function isEqualOrBetween(lev, val) {
        if ( props.levelValues[lev]===val ) {
            return true
        }
        if ( val> props.levelValues[lev] && props.levelValues.length<=lev+1 ) {
            return true
        }
        if ( val > props.levelValues[lev] && val<props.levelValues[lev+1]) {
            return true
        }

        return false
    }

    function closestLevel() {
        
        for (var i = 0; i < props.levelValues.length; i++) {
            if ( props.levelValues[i]===props.value ) {
                return i
            }
            if ( props.value> props.levelValues[i] && props.levelValues.length<=i+1 ) {
                return i
            }
            if ( props.value > props.levelValues[i] && props.value<props.levelValues[i+1]) {
                return i
            }
        }

        return props.levelValues.length+1
    }

    
    return (
        <div className={props.centered ? classes.centeredHolder : classes.holder} >
            { levels.map((lev) =>
            <IconButton key={lev} onClick={ () => applyLevel(lev) } className={ ( level>0 && lev<=level ) ? classes.baseOn : classes.baseOff}>
                { lev===0  ?
                <>
                    { (working && lev===level) ?
                        <CircularProgress size={24} className={classes.working} />
                    :
                        <React.Fragment>
                            { level>0 ?
                                <LensIcon style={{  width: 8+(lev*3), height: 8+(lev*3), margin: 0 }} className={ classes.smallIcon} />
                            :
                                <TripOriginIcon className={ lev===level ? classes.selectedZero : classes.zeroIcon} />
                            }
                        </React.Fragment>
                        
                    }
                </>
                :
                <>
                    <div className={lev<=level ? classes.onLine: classes.offLine}></div>
                    { (working && lev===level) ?
                        <CircularProgress size={24} className={classes.working} />
                    :
                    <>
                        { isEqualOrBetween(lev, props.value) ?
                            <ToggleAvatar small={true} onClick={props.avatarClick} avatarState={ "on" } top={true}>
                                { props.value }
                            </ToggleAvatar>
                        :
                            <LensIcon style={{  width: 8+(lev*3), height: 8+(lev*3), margin: 0 }} className={ classes.smallIcon} />
                        }
                    </>
                    }
                    <div style={{ width : "calc(100% - "+(15-lev*3)+"px)" }} className={lev<=level ? classes.onLine: classes.offLine}></div>
                </>
                }
            </IconButton>
            )}
        </div >
    );
}