import React from 'react';
import { makeStyles } from '@mui/styles';
import ListItem from '@mui/material/ListItem';

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
