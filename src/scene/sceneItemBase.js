import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
    
    gridColumn: {
        overflowX: "hidden",
        overflowY: "hidden",
        alignContent: "start",
    },
});


export default function AutomationItemBase(props) {
    
    function widenChildren() {
        var childrenWithProps = React.Children.map(child => { console.log(child); React.cloneElement(child, { wide: true }) })

        return childrenWithProps
    }

    const classes = useStyles();
    const mobileBreakpoint = 800
    const isMobile = window.innerWidth <= mobileBreakpoint;

    return (
        <Grid container spacing={8} xs={ 12 } className={ classes.gridColumn}>
            <Paper elevation={props.elevation}  >
            { React.Children.map(props.children, child =>  React.cloneElement(child, { wide: true }))
            }
            </Paper>
        </Grid>
    );
}
