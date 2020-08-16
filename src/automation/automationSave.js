import React from 'react';
import { makeStyles } from '@material-ui/styles';

import SaveIcon from '@material-ui/icons/Save';

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

export default function AutomationSave(props) {

    const classes = useStyles();

    return (
        <React.Fragment>
            { !props.saved &&
                <Fab size="small" color="primary" onClick={ (e)=> props.save() } className={classes.fabSave} >
                    <SaveIcon />
                </Fab>
            }
        </React.Fragment>
    )
}

