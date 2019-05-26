import React from 'react';
import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import Paper from '@material-ui/core/Paper';


//  theme.palette.background.default,
const useStyles = makeStyles(theme => {
    return {
        coverDimmer: {
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: theme.palette.background.default,
            opacity: "0.8",
        },
    }

});

export default function CoverDimmer(props) {

    const classes = useStyles();
    
    return ( 
        <Paper elevation={0} className={classes.coverDimmer} {...props} />
    );
}

