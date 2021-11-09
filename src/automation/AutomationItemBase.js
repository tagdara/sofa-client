import React from 'react';
import { makeStyles } from '@mui/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

const useStyles = makeStyles({
    
    gridColumn: {
        overflowX: "hidden",
        overflowY: "hidden",
        alignContent: "start",
    },
});


export default function AutomationItemBase(props) {

    const classes = useStyles();

    return (
        <Grid container spacing={8} xs={ 12 } className={ classes.gridColumn}>
            <Paper elevation={props.elevation}  >
            { React.Children.map(props.children, child =>  React.cloneElement(child, { wide: true }))
            }
            </Paper>
        </Grid>
    );
}
