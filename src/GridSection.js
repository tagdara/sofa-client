import React from 'react';
import { makeStyles } from '@material-ui/styles';

import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';

const useStyles = makeStyles(theme => {
    return {
        gridColumn: {
            margin: 1,
            overflowX: "hidden",
            overflowY: "hidden",
            alignContent: "start",
            padding: "3 !important",
            backgroundColor: theme.palette.background.page,
            borderRadius: "4px 4px 4px 4px",
        },
        nopad: {
            padding: 0,
        }
    }
});


export default function GridSection(props) {
    
    const classes = useStyles();

    return (
        <Grid container item spacing={1} key={props.name} xs={12} className={ classes.gridColumn}>
            {props.name &&
                <Grid item xs={12} className={classes.nopad}>
                <List className={classes.nopad}>
                    <ListItem>
                        <ListItemText primary={props.name} />
                        <ListItemSecondaryAction>
                        {props.secondary}
                        </ListItemSecondaryAction>
                    </ListItem>
                </List>
                </Grid>
            }
            {props.children}
        </Grid>
    );
}


