import React from 'react';
import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { withLayout } from './DataContext/withLayout';

import Icon from '@material-ui/core/Icon';
import Toolbar from '@material-ui/core/Toolbar';

import HomeIcon from '@material-ui/icons/Home';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Fab from '@material-ui/core/Fab';

// Z Index for dialogs is 1300, so this needs to be lower than that, but still very high to avoid glitches with switches showing through

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


function BottomButtons(props) {

    const classes = useStyles();

    return (
        <React.Fragment>
            <Toolbar className={classes.bottomSpacer} />
            <Fab color="primary" onClick={ (e)=> props.setLayout('Home') } className={classes.fabHome} >
                <HomeIcon />
            </Fab>
            { props.backName &&
                <Fab color="primary" onClick={ ()=>  props.goBack() } className={classes.fabBack} >
                    <ArrowBackIcon />
                </Fab>
            }
        </React.Fragment>
    )
}


export default withLayout(BottomButtons);
