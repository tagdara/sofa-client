import React from 'react';
import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';

import Icon from '@material-ui/core/Icon';
import Toolbar from '@material-ui/core/Toolbar';

import ClearIcon from '@material-ui/icons/Clear';
import SaveIcon from '@material-ui/icons/Save';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Fab from '@material-ui/core/Fab';

const useStyles = makeStyles({

    fabHome: {
        position: 'fixed',
        bottom: 8,
        right: 16,
        padding: 0,
        marginBottom: "env(safe-area-inset-bottom)",
        boxSizing: "content-box",
        zIndex: 1200,
    },
    fabBack: {
        position: 'fixed',
        bottom: 8,
        right: 16,
        padding: 0,
        marginBottom: "env(safe-area-inset-bottom)",
        boxSizing: "content-box",
        zIndex: 1200,
    },
    fabCancel: {
        position: 'fixed',
        bottom: 8,
        right: 84,
        padding: 0,
        marginBottom: "env(safe-area-inset-bottom)",
        boxSizing: "content-box",
        zIndex: 1200,
    },
    bottomSpacer: {
        marginTop: 64,
        marginBottom: "env(safe-area-inset-bottom)",
    }

});

function iconLoading(props) {
    
    if (props.error) {
        console.log(props)
        return <ClearIcon />;
    } else if (props.pastDelay) {
        return <LensIcon />;
    } else {
        return null;
    }
}


export default function AutomationSave(props) {

    const classes = useStyles();

    return (
        <React.Fragment>
            <Toolbar className={classes.bottomSpacer} />
            { !props.saved ?
                <React.Fragment>
                    <Fab color="primary" onClick={ ()=>  props.goBack() } className={classes.fabCancel} >
                        <ClearIcon />
                    </Fab>
                    { props.name && 
                    <Fab color="primary" onClick={ (e)=> props.save() } className={classes.fabHome} >
                        <SaveIcon />
                    </Fab>
                    }
                </React.Fragment>
                :
                <Fab color="primary" onClick={ ()=>  props.goBack() } className={classes.fabBack} >
                    <ArrowBackIcon />
                </Fab>
            }
        </React.Fragment>
    )
}

