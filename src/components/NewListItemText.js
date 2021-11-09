import React from 'react';
import { makeStyles } from '@mui/styles';

import ListItemText from '@mui/material/ListItemText';

const useStyles = makeStyles(theme => {
    return {        
        smallSecondary: {
            fontSize: 12,
            flexGrow: 1,
            display: "flex",
        },
        primary: {
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            maxWidth: "100%",
            flexGrow: "1",
        },
        flex: {
            display: "flex",
            flexGrow: 1,
            width: "100%",
            flexDirection: "column",
            //minHeight: 41,
            //maxHeight: 41,
            justifyContent: "center",
            margin: 0,
            alignItems: "flex-start"
        },
    }
});

const SofaListItemText = props => {
    
    const classes = useStyles();

    return (
        <ListItemText   classes={{ root: classes.flex, primary: classes.primary, secondary : classes.smallSecondary }} 
                        primary={ props.primary } 
                        secondary={ props.secondary } 
                    />
    );
}

export default SofaListItemText;


