import React from 'react';
import { makeStyles } from '@mui/styles';

import CardBase from 'components/CardBase';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';

const useStyles = makeStyles({

    primary: {
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
    },
    countButton: {
        fontSize: 10
    }
});

export default function TreeHeader(props) {
    
    const classes = useStyles();
                   
    return (
        <CardBase wide={false} small={true} >
            <ListItem>
                <ListItemText classes={{ primary: classes.primary }} primary={ props.name}  />
                <IconButton color="primary" variant="contained" aria-label="Child count" size="small" className={classes.countButton}>
                    { props.childCount}
                </IconButton>
            </ListItem>            
        </CardBase>
    )
}
