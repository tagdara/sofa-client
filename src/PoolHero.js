import React, { Component, createElement  } from 'react';
import { makeStyles } from '@material-ui/styles';
import { withData } from './DataContext/withData';
import { withLayout } from './layout/NewLayoutProvider';

import Grid from '@material-ui/core/Grid';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import GridItem from './GridItem'
import ToggleAvatar from './ToggleAvatar';

const useStyles = makeStyles({
        
    list: {
        width: '100%',
    },
    
});

function PoolHero(props) {
    
    const classes = useStyles();
    const tempnames=['Outdoor Temperature','Pool Temperature', 'Spa Temperature']

    function tempColor(temp) {
        if (temp>=74) { return "hot" }
        if (temp<70) { return "cool" }
        return "mid";
    }
    
    function getTemp(devname) {
        var dev=props.deviceByName(devname)
        var devprops=props.deviceProperties[dev.endpointId]
        return devprops.temperature.value
    }
        
    return (
        <GridItem wide={props.wide} nolist={true}>
            { tempnames.map((devname) =>
                <Grid item xs={4} key={devname}>
                    <ToggleAvatar key={devname} avatarState={ tempColor(getTemp(devname))}>{getTemp(devname)}</ToggleAvatar>
                </Grid>
            )}
        </GridItem>
    );
}

export default withData(withLayout(PoolHero));
