import React from 'react';
import { makeStyles } from '@material-ui/styles';
import classNames from 'classnames';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List'

const useStyles = makeStyles({
    
    
    content: {
        display: 'flex',
        margin: 0,
        boxSizing: "border-box",
        padding: "0 8px 0 0",
        flexWrap: 'wrap',
        alignItems: "center",
        flexGrow: 1,
        minWidth: "320px",
        minHeight: 80,
        flexBasis: 0,
        position: "relative",
    },
    nopad: {
        padding: 0,
    },
    list: {
        width: "100%",
    },
    nopadlist: {
        padding: 0,
        width: "100%",
    },
    colorband: {
        borderLeft: "solid 5px #44F",
    }
});


export default function GridItem(props) {
    
    const itemElevation = 1
    const mobileBreakpoint = 800
    const classes = useStyles();
    const isMobile = window.innerWidth <= mobileBreakpoint;
 
    return (
        <Grid item xs={props.xs ? props.xs : (isMobile || props.wide ? 12 : 4) } >
            <Paper elevation={props.elevation} className={classNames(props.content, props.nopad && classes.nopad, props.colorband && classes.colorband)}  >
                { !props.nolist ?
                    <List className={ props.nopad ? classes.nopadlist : classes.list} >
                        {props.children}
                    </List>
                :
                <Grid container >
                    {props.children}
                </Grid>
                }
            </Paper>
        </Grid>
    );
}

GridItem.defaultProps = {
    elevation: 1,
    wide: false,
}
