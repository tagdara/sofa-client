import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Paper from '@material-ui/core/Paper';

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
            borderRadius: "4px 4px 0px 0px",
        },
    }
});

export default function CoverDimmer(props) {

    const classes = useStyles();
    return ( 
        <Paper elevation={0} className={classes.coverDimmer} {...props} />
    );
}

