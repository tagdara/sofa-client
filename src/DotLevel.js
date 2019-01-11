import React, { Component } from "react";
import { makeStyles } from '@material-ui/styles';

import IconButton from '@material-ui/core/IconButton';
import LensIcon from '@material-ui/icons/Lens';
import LensOutlinedIcon from '@material-ui/icons/LensOutlined';
import TripOriginIcon from '@material-ui/icons/TripOrigin';

const useStyles = makeStyles({

    selectedIcon: {
        height: 24,
        width: 24,
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
    }
});

export default function DotLevel(props) {
    
    const classes = useStyles();
    const levels = [0,1,2,3]
    

    return (
        <React.Fragment >
            { levels.map((level) =>
            <IconButton key={level} color={ props.level >0 ? "primary" : "default" } onClick={ () => props.select(level) } >
                { level==0  ?
                <TripOriginIcon className={ level==props.level ? classes.selectedIcon : classes.zeroIcon} />
                :
                <LensIcon className={ level==props.level ? classes.selectedIcon : classes.smallIcon} />
                }
            </IconButton>
            )}
        </React.Fragment >
    );
}


