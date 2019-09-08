import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';

import IconButton from '@material-ui/core/IconButton';
import LensIcon from '@material-ui/icons/Lens';
import TripOriginIcon from '@material-ui/icons/RadioButtonUnchecked';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles({

    selectedIcon: {
        height: 24,
        width: 24,
    },
    selectedZero: {
        height: 20,
        width: 20,
    },
    zeroIcon: {
        margin: 6,
        height: 10,
        width: 10,
    },
    smallIcon: {
        margin: 8,
        height: 8,
        width: 8,
    },
    working: {
        margin: 0,
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
            <IconButton key={lev} color={ level >0 ? "primary" : "default" } onClick={ () => applyLevel(lev) } >
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
                    { (working && lev===level) ?
                        <CircularProgress size={24} className={classes.working} />
                    :
                    <LensIcon className={ lev===level ? classes.selectedIcon : classes.smallIcon} />
                    }
                </>
                }
            </IconButton>
            )}
        </React.Fragment >
    );
}


