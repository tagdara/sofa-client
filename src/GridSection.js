import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/styles';
import { LayoutContext } from './layout/NewLayoutProvider';

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
            padding: "3px !important",
            backgroundColor: theme.palette.background.page,
            borderRadius: "4px 4px 4px 4px",
        },
        nopad: {
            padding: 0,
        }
    }
});


export default function GridSection(props) {
    
    const { isMobile } = useContext(LayoutContext);
    const classes = useStyles();

    return (
        <Grid container item spacing={1} key={props.name} xs={12} className={ classes.gridColumn}>
            {props.name &&
                <Grid item xs={12} className={classes.nopad}>
                <List className={classes.nopad}>
                    <ListItem>
                        <ListItemText primary={props.name} />
                        { (!isMobile || !props.break) &&
                            <ListItemSecondaryAction>
                                {props.secondary}
                            </ListItemSecondaryAction>
                        }
                    </ListItem>
                    { (isMobile && props.break) &&
                        <ListItem>
                            <ListItemSecondaryAction>
                                {props.secondary}
                            </ListItemSecondaryAction>
                        </ListItem>
                    }
                </List>
                </Grid>
            }
            {props.children}
        </Grid>
    );
}

GridSection.defaultProps = {
    break: false
}
 

