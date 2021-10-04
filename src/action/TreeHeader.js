import React from 'react';
import { makeStyles } from '@material-ui/styles';

import CardBase from 'components/CardBase';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';

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
