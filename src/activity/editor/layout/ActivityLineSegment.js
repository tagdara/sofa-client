import React from 'react';
import { makeStyles } from '@mui/styles';
import Grid from '@mui/material/Grid';

const useStyles = makeStyles({

    flex: {
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
    },
});

const ActivityLineSegment = props => {
    
    const classes = useStyles();

    return (
        <Grid item xs={props.wide ? 4 : 12 } className={classes.flex} >
            { props.children }
        </Grid>
    )
}

export default ActivityLineSegment
