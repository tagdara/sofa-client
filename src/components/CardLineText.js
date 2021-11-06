import React from 'react';
import { makeStyles } from '@material-ui/styles';
import ListItemText from '@material-ui/core/ListItemText';

const useStyles = makeStyles(theme => {
    return {        
        secondary: {
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

export default function CardLineText(props) {
    
    const classes = useStyles();

    return (
        <ListItemText   onClick={ props.onClick } 
                        classes={{ root: classes.flex, primary: classes.primary, secondary : classes.secondary }} 
                        primary={ props.primary } 
                        secondary={ props.secondary } 
                    />
    )
}