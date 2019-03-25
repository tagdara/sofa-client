import React from 'react';
import { makeStyles } from '@material-ui/styles';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    
    root: {
        alignItems: "flex-end",
        padding: "16px 16px 0px 16px !important",
        display: "flex",
    },
    label: {
        display: "flex",
        flexGrow:1,
    }
});

export default function AutomationDetails(props) {

    const classes = useStyles();
    
    function editTitle(newvalue) {
        props.save('title',newvalue)
    }

    return (    
        <Grid item xs={ 12 } className={classes.root}>
            <Typography>
               { props.automation.lastrun }
            </Typography>
        </Grid>
    )

};
