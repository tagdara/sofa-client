import React from 'react';
import { makeStyles } from '@mui/styles';

import ListItem from '@mui/material/ListItem';

const useStyles = makeStyles(theme => {
    return {        
        listItemNoPad: {
            cursor: "pointer",
            boxSizing: "border-box",
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
            boxSizing: "border-box",
            minHeight: 56,
            padding: "8px 16px"
        },

    }
});

const SofaListItem = props => {
    
    const classes = useStyles();

    return (
        <ListItem   component={"div"} 
                    className={ (props.inList || props.noPad) ? classes.listItemNoPad : classes.listItem } 
                    { ...props }
                >
            { props.children }
        </ListItem>
    );
}

export default SofaListItem;

