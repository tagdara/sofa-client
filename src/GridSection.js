import React, { useContext, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { LayoutContext } from './layout/NewLayoutProvider';
import classNames from 'classnames';

import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';

const useStyles = makeStyles(theme => {
    return {
        base: {
            margin: 1,
            overflowX: "hidden",
            alignContent: "start",
            padding: "3px !important",
            borderRadius: "4px 4px 4px 4px",
        },
        gridColumn: {
            overflowY: "hidden",
        },
        scrollColumn: {
            overflowY: "auto",
            height: "100%",
        },
        nopad: {
            padding: 0,
        },
        background: {
            backgroundColor: theme.palette.background.page,
        }
    }
});


export default function GridSection(props) {
    
    const { isMobile } = useContext(LayoutContext);
    const classes = useStyles();
    const [show, setShow] = useState(props.show);

    return (
        <Grid container item spacing={1} key={props.name} xs={props.xs} 
            className={ classNames(classes.base, props.scroll ? classes.scrollColumn : classes.gridColumn, props.background ? classes.background : null)} 
        >

            {props.name &&
                <Grid item xs={12} className={classes.nopad}>
                <List className={classes.nopad} >
                    <ListItem>
                        <ListItemText primary={props.name} onClick={ () => setShow(!show) } />
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
            { show && props.children}
        </Grid>
    );
}

GridSection.defaultProps = {
    break: false,
    show: true,
    scroll: false,
    xs: 12,
    background: true,
}
 

