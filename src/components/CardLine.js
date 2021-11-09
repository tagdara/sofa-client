import React from 'react';
import { makeStyles } from '@mui/styles';

import ListItem from '@mui/material/ListItem';

const useStyles = makeStyles(theme => {
    return {        
        listItemNoPad: {
            cursor: "pointer",
            boxSizing: "content-box",
            //boxSizing: "border-box",
            padding: "0 16px",
            height: 56,
            minHeight: 56,
            display: "flex",
            flexGrow: 1,
            overflow: "hidden",
            borderRadius: 8,
            width: "100%",
        },
        listItem: {
            cursor: "pointer",
            //boxSizing: "content-box",
            boxSizing: "border-box",
            //height: 72,
            minHeight: 64,
            padding: "0 16px",
            overflow: "hidden",
            display: "flex",
            flexGrow: 1,
            width: "100%",
            paddingBottom: 0,
        },
    }
});

export default function CardLine(props) {
    
    const classes = useStyles();

    return (
        <ListItem   component={"div"} 
                    className={ (props.inList || props.noPad || props.short) ? classes.listItemNoPad : classes.listItem } 
                    button={props.button} 
                    onClick={ props.onClick }>
            { props.children }
        </ListItem>
    );
}


