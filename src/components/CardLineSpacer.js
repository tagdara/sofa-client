import React from 'react';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => {
    return {        
        spacer: {
            display: "flex",
            flexGrow: 1,
        },
    }
});

export default function CardLineSpacer(props) {
    
    const classes = useStyles();

    return (
        <div className={classes.spacer} />
    )
}