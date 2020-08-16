import React from 'react';
import { makeStyles } from '@material-ui/styles';
import classNames from 'classnames';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List'

const useStyles = makeStyles(theme => {
    return {
        content: {
            display: 'flex',
            margin: 0,
            boxSizing: "border-box",
            padding: "0",
            flexWrap: 'wrap',
            alignItems: "center",
            flexGrow: 1,
            flexBasis: 0,
            position: "relative",
            minWidth: "320px",
            minHeight: 64,      
            backgroundColor: theme.palette.layer.card,
        },
        border: {
            borderWidth: "thin",
            borderStyle: "solid",
            borderColor: theme.palette.divider,
        },
        borderHover: {
            '&:hover': {
                borderColor: theme.palette.primary.dark,
            }
        },
        hover: {
            '&:hover': {
                backgroundColor: theme.palette.background.hover,
            }
        },
        nopad: {
            padding: 0,
            minHeight: 64,
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
        },
        thinmargin: {
            margin: 2,
            padding: 0,
        },
        noMargin: {
            margin: 0,
            padding: 0,
        },
        normal: {
            padding: "4px !important",
        },
        inset: {
            marginTop: "-16px",
            zIndex: 0,
        },
        upper: {
            zIndex: 900,
        },
        color: {
            color: theme.palette.primary.contrastText,
            backgroundColor: "#444",
            borderBottomRightRadius: 0,
            borderBottomLeftRadius: 0,
            padding: 0,
        },
        flex: {
            display: "flex",
            width: "100%",
        }
    }
});


export default function GridItem(props) {
    
    const mobileBreakpoint = 800
    const classes = useStyles();
    const isMobile = window.innerWidth <= mobileBreakpoint;

    var itemdata = (
        <React.Fragment>
        { !props.nolist ?
                <List className={ props.nopad ? classes.nopadlist : classes.list} >
                    {props.children}
                </List>
            :
            <Grid item container >
                {props.children}
            </Grid>
        }
        </React.Fragment>
    )
    
    function checkMargin() {
        if (props.noMargin) {
            return classes.noMargin
        }
        if (props.thinmargin) {
            return classes.thinmargin
        }
        return classes.normal
    }

    return (
        <Grid item container={ props.container } xs={props.xs ? props.xs : (isMobile || props.wide ? 12 : 3) } onClick={props.onClick}
                className={classNames(props.flex && classes.flex, props.inset && classes.inset, checkMargin() )}>
            { !props.nopaper ?
                <Paper elevation={props.elevation} className={classNames( classes.content, props.hover && classes.hover, props.nopad && classes.nopad)}  >
                    { itemdata }
                </Paper>
            :
            <React.Fragment>
                { itemdata }
            </React.Fragment>
            }
        </Grid>
    );
}

GridItem.defaultProps = {
    elevation: 0,
    wide: false,
    thinmargin: false,
    nopaper: false,
    inset: false,
    color: false,
    flex: false,
    noMargin: false,
    container: false,
}
