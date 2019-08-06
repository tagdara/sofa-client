import React from 'react';
import { makeStyles } from '@material-ui/styles';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Moment from 'react-moment';
import Button from '@material-ui/core/Button';

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
    
    function runAutomation(conditions=true) {
        props.sendAlexaCommand(props.name, 'logic:activity:'+props.name, 'SceneController', 'Activate', {}, {"conditions": conditions})
    }

    return (    
        <>
            <Grid item xs={ 6 } className={classes.root}>
                <Typography>
                    Last Run: 
                    <Moment format="ddd MMM D h:mm:sa">{props.automation.lastrun }</Moment>
                </Typography>
            </Grid>
            <Grid item xs={ 6 } className={classes.root}>
                <Button onClick={() => runAutomation()}>Test</Button>
                <Button onClick={() => runAutomation(false)}>Test (No Conditions)</Button>
            </Grid>
        </>
    )

};
