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


    fabSave: {
        position: 'fixed',
        bottom: 80,
        right: 24,
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
            { !props.saved &&
                <Fab size="small" color="primary" onClick={ (e)=> props.save() } className={classes.fabSave} >
                    <SaveIcon />
                </Fab>
            }
        </React.Fragment>
    )
}

