import React from 'react';
import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { withLayout } from './layout/NewLayoutProvider';

import EditIcon from '@material-ui/icons/Edit';
import MenuIcon from '@material-ui/icons/Menu';
import HomeIcon from '@material-ui/icons/Home';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import Fab from '@material-ui/core/Fab';

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
    fab: {
        position: "fixed",
        bottom: 16,
        right: 16,
        marginBottom: "env(safe-area-inset-bottom)",
        zIndex: 1200,
    },
    fabBack: {
        position: 'fixed',
        bottom: 24,
        right: 80,
        padding: 0,
        marginBottom: "env(safe-area-inset-bottom)",
        boxSizing: "content-box",
        zIndex: 1200,
    },    
}); 

function NewAppBar(props) {
    
    const classes = useStyles();
    
    function callMaster() {
        if (props.masterButtonState=='Home') {
            props.goHome()
        } 
        if (props.masterButtonState=='System') {
            props.applyLayoutCard('SystemLayout')
        } 

    }

    return (
        <>
        <Fab className={classes.fab} color="primary" onClick={ ()=> callMaster() } >
            { props.masterButtonState=='System' && <MenuIcon /> }
            { props.masterButtonState=='Home' && <HomeIcon /> }
        </Fab>
        { props.backPage.name &&
            <Fab size="small" color="primary" onClick={ ()=>  props.goBack() } className={classes.fabBack} >
                <ArrowBackIcon />
            </Fab>
        }
        </>
    );
}


export default withLayout(NewAppBar)
