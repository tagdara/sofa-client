import React from 'react';
import { makeStyles } from '@mui/styles';
import ListItemText from '@mui/material/ListItemText';

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
                        sx={{ minWidth: props.width,  maxWidth: props.width }}
                        classes={{ root: classes.flex, primary: classes.primary, secondary : classes.secondary }} 
                        primary={ props.primary } 
                        secondary={ props.secondary } 
                    />
    )
}