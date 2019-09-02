import React from 'react';
import { makeStyles } from '@material-ui/styles';

import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import GridItem from '../GridItem';

const useStyles = makeStyles({
    
    root: {
        alignItems: "flex-end",
        padding: "8px 16px 8px 16px !important",
        height: 64,
        display: "flex",
    },
    label: {
        display: "flex",
        flexGrow:1,
    }
});

export default function AutomationTitle(props) {

    const classes = useStyles();
    
    function editTitle(newvalue) {
        props.save('title',newvalue)
    }

    return (    
        <GridItem nolist={true} elevation={0} wide={true}>
        <Grid item xs={ 12 } className={classes.root}>
            <TextField
                fullWidth
                label={'Name'}
                value={props.name}
                onChange={(e) => editTitle(e.target.value)}
            />
            {props.children}
        </Grid>
        </GridItem>
    )

};
