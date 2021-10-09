import React from 'react';
import { makeStyles } from '@material-ui/styles';
import ListItem from '@material-ui/core/ListItem';

const useStyles = makeStyles(theme => {
    return {        
        placeholder: {
            height: 57,
            width: "100%",
        },
    }
});

const LightPropertyPlaceholder = props => {

    const classes = useStyles();

    return (
        <ListItem className={classes.placeholder} />
    )

}

export default LightPropertyPlaceholder;
