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
        },
        listItem: {
            cursor: "pointer",
            boxSizing: "content-box",
            //boxSizing: "border-box",
            //height: 72,
            minHeight: 56,
            padding: "8px 16px"
        },
    }
});

export default function CardLine(props) {
    
    const classes = useStyles();

    return (
        <ListItem   component={"div"} 
                    className={ (props.inList || props.noPad) ? classes.listItemNoPad : classes.listItem } 
                    button={props.button} 
                    onClick={ props.onClick }>
            { props.children }
        </ListItem>
    );
}


