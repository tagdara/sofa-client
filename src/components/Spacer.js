import React from 'react';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => {
    return {      
        spacer: {
            flexGrow: 1,
            display: "flex",
        },
    }
});

const Spacer = props => {

    const classes = useStyles();

    return (
        <div className={classes.spacer} />
    )
}

export default Spacer;