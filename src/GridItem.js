import React from 'react';
import { makeStyles } from '@material-ui/styles';
import classNames from 'classnames';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List'

const useStyles = makeStyles(theme => {
    return {
   
        content: {
            borderWidth: "thin",
            borderStyle: "solid",
            borderColor: theme.palette.divider,
            display: 'flex',
            margin: 0,
            boxSizing: "border-box",
            padding: "0",
            flexWrap: 'wrap',
            alignItems: "center",
            flexGrow: 1,
            minWidth: "320px",
            minHeight: 80,
            flexBasis: 0,
            position: "relative",
        },
        hover: {
            '&:hover': {
                backgroundColor: theme.palette.background.hover,
                borderColor: theme.palette.primary.dark,
            }
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
        },
        thinmargin: {
            margin: 2,
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
            <Grid container >
                {props.children}
            </Grid>
        }
        </React.Fragment>
    )

    return (
        <Grid item xs={props.xs ? props.xs : (isMobile || props.wide ? 12 : 4) } className={classNames(props.inset ? classes.inset : classes.upper, props.thinmargin ? classes.thinmargin: classes.normal)}>
            { !props.nopaper ?
                <Paper elevation={props.elevation} className={classNames( !props.color && classes.content, props.color  && classes.color, props.hover && classes.hover, props.nopad && classes.nopad, props.colorband && classes.colorband)}  >
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
}
