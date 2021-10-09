import React, { useRef, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import classNames from 'classnames';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles(theme => {
    return {
        content: {
            display: 'flex',
            margin: 0,
            boxSizing: "border-box",
            padding: "12px 0",
            flexWrap: 'wrap',
            //alignItems: "center",
            flexGrow: 1,
            flexBasis: 0,
            position: "relative",
            minWidth: "320px",
            //minHeight: 64,      
            backgroundColor: theme.palette.layer.card,
            width: "100%",
            alignItems: "flex-start",
            borderRadius: 8,
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
        },
        list: {
            display: "flex",
            width: "100%",
            flexDirection: "column",
        },
        nopadlist: {
            padding: 0,
            display: "flex",
            width: "100%",
            flexDirection: "column",
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
            boxSizing: "border-box",
            display: "flex",
            width: "100%",
        },
        outer: {
            boxSizing: "border-box",
            display: "flex",
            width: "100%",
            padding: "4px !important",
            position: "relative",
        },
        
        paperGrid: {
            '& > :first-child': {
                paddingTop: 0,
            },
            '& > :last-child': {
                paddingBottom: 0,
            },
        },
        collapseGrid: {
            '& > :first-child': {
                paddingTop: 0,
            },
            '& > :nth-last-child(2)' : {
                paddingBottom: 0,
            }
            
        },
        highlight: {
            backgroundColor: theme.palette.background.button,
            //backgroundColor: theme.palette.primary.dark+"10",
            border: "solid 1px "+theme.palette.primary.dark+"30",
            margin: 1,
        },
        test: {
            backgroundColor: "#F00",
        }
    }
});


export default function CardBase(props) {
    
    const mobileBreakpoint = 800
    const classes = useStyles();
    const isMobile = window.innerWidth <= mobileBreakpoint;
    const sizerRef = useRef(false)
    const [ready, setReady] = useState(false)

    useEffect(() => { 
        
        try {
            if (sizerRef.current.parentNode.offsetWidth) { setReady(true) }
            else { setReady(false) }
        }
        catch { setReady(false) }
    // eslint-disable-next-line 
    }, [ sizerRef.current ] )

    
    function detectWideParent() {
        if (isMobile) { return 12 }
        if (props.wide) { return 12 }
        if (sizerRef.current.parentNode===undefined) { return 12 }
        if (sizerRef.current.parentNode.offsetWidth>=1300) { return 3 }
        if (sizerRef.current.parentNode.offsetWidth>=800) { return 4 }
        return 12
    }

    return (
        <Grid item container xs={ detectWideParent() } onClick={props.onClick} ref={sizerRef}
            className={classes.outer}>
            { ready &&
            <Paper  elevation={props.elevation} 
                    className={classNames( classes.content, 
                                            props.highlight && classes.highlight, 
                                            props.hover && classes.hover, 
                                            (props.small || props.noPad) && classes.nopad
                                        )}  >
                <Grid item container className={ props.hasCollapse ? classes.collapseGrid : classes.paperGrid } >
                    {props.children}
                </Grid>
            </Paper>
            }
        </Grid>
    );
}

CardBase.defaultProps = {
    small: false,
    noPad: false,
    elevation: 0,
    wide: false,
    thinmargin: false,
    nopaper: false,
    inset: false,
    color: false,
    flex: false,
    noMargin: false,
    container: false,
    xs: undefined,
}
