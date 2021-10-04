import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(theme => {
    return {
        gridWide: {
            margin: 1,
            overflowX: "hidden",
            overflowY: "hidden",
            alignContent: "start",
            padding: "3px !important",
            backgroundColor: theme.palette.layer.section,
            borderRadius: "4px 4px 4px 4px",
            maxWidth: "96%",
        },
        mobileWide: {
            height: "100%",
            margin: 0,
            overflowX: "hidden",
            //overflowY: "hidden",
            alignContent: "start",
            padding: "3px !important",
            backgroundColor: theme.palette.layer.section,
            borderRadius: "4px 4px 4px 4px",
        }
    }
});

export default function SofaSinglePage(props) {
    
    const classes = useStyles();

    return (
            <Grid container item spacing={0} xs={12} className={ props.isMobile ? classes.mobileWide : classes.gridWide } >
                { props.children }
            </Grid>
    );
}

