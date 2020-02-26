import React, { useContext } from 'react';
import { DataContext } from '../DataContext/DataProvider';

import { makeStyles } from '@material-ui/styles';

import Grid from '@material-ui/core/Grid';
import Moment from 'react-moment';
import Button from '@material-ui/core/Button';
import GridItem from '../GridItem';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import LowPriorityIcon from '@material-ui/icons/LowPriority';
import PlaylistPlayIcon from '@material-ui/icons/PlaylistPlay';

const useStyles = makeStyles({
    
    root: {
        alignItems: "flex-end",
        display: "flex",
    },
    label: {
        display: "flex",
        flexGrow:1,
    }
});

export default function AutomationDetails(props) {

    const classes = useStyles();
    const { deviceByEndpointId } = useContext(DataContext);
    
    function runAutomation(conditions=true) {
        deviceByEndpointId('logic:activity:'+props.name).SceneController.directive('Activate', {}, {"conditions": conditions})
    }

    return (    
        <GridItem nolist={true} elevation={0} wide={true}>
            <Grid item xs={ 12 } className={classes.root}>
                <ListItem>
                    <ListItemText primary={"Last Run"} secondary={ props.automation.lastrun!=='never' ? <Moment format="ddd MMM D h:mm:sa">{props.automation.lastrun }</Moment> : 'Never'} />
                    <Button onClick={() => runAutomation()}><PlaylistPlayIcon /></Button>
                    <Button onClick={() => runAutomation(false)}><LowPriorityIcon /></Button>
                </ListItem>
            </Grid>
        </GridItem>
    )

};
