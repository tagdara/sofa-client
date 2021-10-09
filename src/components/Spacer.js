import React from 'react';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => {
    return {      
        growSpacer: {
            flexGrow: 1,
            display: "flex",
        },
        spacer: {
            width: props => props.width,
            minWidth: props => props.width,
        }
    }
});

const Spacer = props => {

    const classes = useStyles(props);
    
    if (props.width) {
        return <div className={classes.spacer} />
    }

    return (
        <div className={classes.growSpacer} />
    )
}

export default Spacer;