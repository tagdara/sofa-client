import React from 'react';
import ReactDOM from 'react-dom';
import { useState, useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/styles';
import { withLayout } from './layout/NewLayoutProvider';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles({
        
    list: {
        minWidth: 320,
    },
    flex: {
        flex: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
    desktopTop: {
        paddingTop: "env(safe-area-inset-top)",
    },
    phoneTop: {
        paddingTop: "env(safe-area-inset-top)",
        height: 2,
    },
    notchTest: {
        paddingTop: "env(safe-area-inset-top)",
        position: "absolute",
        top: 0,
        height: 0,
    },
    notchLeft: {
        position: "fixed", 
        height: 24, 
        top: 10, 
        left: 18, 
        width: 60, 
        backgroundColor: "#ff5722", 
        borderRadius: "10px", 
        zIndex: 9999        
    },
    notchRight: {
        position: "fixed", 
        height: 24, 
        top: 10, 
        right: 12, 
        width: 72, 
        backgroundColor: "#ff5722", 
        borderRadius: "10px", 
        zIndex: 9999
    }
}); 

function SofaAppBar(props) {
    
    const classes = useStyles();
    const notchTest = useRef(null);
    
    function notchBubbles() {
        if (notchTest.current!==null) {
            let barStyle = window.getComputedStyle(ReactDOM.findDOMNode(notchTest.current))
            let barTop = barStyle.getPropertyValue('padding-top')
            if (barTop!='0px') { 
                return true 
            } else {
                return false
            }
        }
    }

    return (
        <React.Fragment>
            <div ref={notchTest} className={classes.notchTest}></div>
            { notchBubbles() ?
                <React.Fragment>
                    <div className={classes.notchLeft}></div> 
                    <div className={classes.notchRight}></div> 
                </React.Fragment>
            :
                <AppBar className={props.mobile ?  classes.phoneTop: classes.desktopTop} >
                    { props.mobile ? 
                        <div></div>
                    :
                        <Toolbar>
                            <IconButton className={classes.menuButton} color="inherit" aria-label="Menu" onClick={ ()=> props.open() }>
                                <MenuIcon />
                            </IconButton>
                            <Typography variant="h6" color="inherit" className={classes.flex}>
                                Home
                            </Typography>
                        </Toolbar>
                    }
                </AppBar>
            }
        </React.Fragment>
    );
}


export default withLayout(SofaAppBar)
