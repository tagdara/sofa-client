import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles({
    
    gridColumn: {
        overflowX: "hidden",
        overflowY: "hidden",
        alignContent: "start",
    },
    gridColumnColor: {
        backgroundColor: "#ddd",
        overflowX: "hidden",
        overflowY: "hidden",
        alignContent: "start",
    },

});


export default function GridPage(props) {
    
    function widenChildren() {
        var childrenWithProps = React.Children.map(child => { console.log(child); React.cloneElement(child, { wide: true }) })

        return childrenWithProps
    }

    const classes = useStyles();
    const mobileBreakpoint = 800
    const isMobile = window.innerWidth <= mobileBreakpoint;

    return (
        <Grid container item spacing={isMobile ? 2 : 8} key={props.name} xs={ isMobile || props.wide ? 12 : 4 } className={ props.bgc ? classes.gridColumnColor : classes.gridColumn}>
            { React.Children.map(props.children, child =>  React.cloneElement(child, { wide: true }))
            }
        </Grid>
    );
}
