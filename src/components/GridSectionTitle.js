import React from 'react';
import { makeStyles } from '@mui/styles';
import useLayoutStore from 'store/layoutStore'

import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

const useStyles = makeStyles(theme => {
    return {
        title: {
            padding: 4,
            display: "flex",
            flexGrow: 2,
        },
        titleBlock: {
            padding: 4,
            display: "flex",
            flexGrow: 1,
            flexAlign: "space-between",
        },
        center: {
            width: "100%",
            justifyContent: "center",
        },
        end: {
            display: "flex",
            flexGrow: 0,
            justifyContent: "flex-end",
        },
    }
});


export default function GridSectionTitle(props) {
    
    const isMobile = useLayoutStore( state => state.isMobile )
    const classes = useStyles();

    if (!props.name) { return null }

    return (
        <Grid item xs={12} className={classes.titleBlock}>
            <Typography variant="h6" className={classes.title} onClick={props.onClick} >{props.name}</Typography>
            <div className={ (!isMobile || !props.break) ? classes.end : classes.center}>
                {props.secondary}
            </div>
        </Grid>
    );
}


