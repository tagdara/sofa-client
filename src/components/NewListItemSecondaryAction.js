import React from 'react';
import { makeStyles } from '@mui/styles';

import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';

const useStyles = makeStyles(theme => {
    return {        
        lisa: {
            display: "flex",
            alignItems: "flex-end",
        }
    }
});

const SofaListItemSecondaryAction = props => {
    
    const classes = useStyles();

    if (props.inline) {
        return  <>
                    { props.children }
                </>
    }

    return (
        <ListItemSecondaryAction className={classes.lisa} >
            { props.children }
        </ListItemSecondaryAction>
    );
}

export default SofaListItemSecondaryAction;

SofaListItemSecondaryAction.defaultProps = {
    inline: true,
}


