import React from 'react';
import { makeStyles } from '@material-ui/styles';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    
    root: {
        alignItems: "flex-end",
        padding: "16px 16px 0px 16px !important",
        height: 64,
        display: "flex",
    },
    underline: {
        alignItems: "flex-end",
        padding: "16px 16px 0px 16px !important",
        height: 64,
        display: "flex",
        borderBottom: "1px solid",
    },

    label: {
        display: "flex",
        flexGrow:1,
    }
});

export default function GridBreak(props) {

    const classes = useStyles();

    return (    
        <Grid item xs={ 12 } className={props.line ? classes.underline : classes.root}>
            <Typography className={classes.label} variant={ props.size ? props.size : "h6"} >{props.label}</Typography>
            {props.children}
        </Grid>
    )

};
