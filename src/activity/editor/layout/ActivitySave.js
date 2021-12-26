import React from 'react';
import { makeStyles } from '@mui/styles';

import SaveIcon from '@mui/icons-material/Save';
import AddBoxIcon from '@mui/icons-material/AddBox';

import Fab from '@mui/material/Fab';
import useActivityEditorStore from 'store/activityEditorStore'
import { saveActivity, addActivity } from 'store/activityEditorHelpers'

const useStyles = makeStyles({
    fabSave: {
        position: 'fixed !important',
        bottom: 64,
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

export default function ActivitySave(props) {

    const classes = useStyles();
    const saved = useActivityEditorStore( state => state.saved )
    const endpointId = useActivityEditorStore( state => state.endpointId )
    const name = useActivityEditorStore( state => state.activity.name )

    const okToSave = name && !saved
    
    if (saved) { return null}

    return (
        <Fab size="small" color="primary" disabled={ !okToSave } onClick={endpointId ? saveActivity : addActivity } className={classes.fabSave} >
            { endpointId ? <SaveIcon /> : <AddBoxIcon /> }
        </Fab>
    )
}

