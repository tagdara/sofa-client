import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

import useActivityEditorStore from 'store/activityEditorStore';

const useStyles = makeStyles({
    
    root: {
        alignItems: "flex-end",
        padding: "8px 16px 8px 16px !important",
        height: 64,
        display: "flex",
    },
    display: {
        alignItems: "flex-end",
        padding: "0 16px",
        display: "flex",
        minHeight: 64,
    },

    label: {
        display: "flex",
        flexGrow:1,
    },
    typo: {
        width: "100%",
        fontHeight: 1,
    }
});

const ActivityName = props => {

    const classes = useStyles();
    const [ editing, setEditing ]=useState(false)
    const name = useActivityEditorStore( state => state.activity.name )
    
    function edit(newName) {
        useActivityEditorStore.set({ activity: { name: newName }})
    }

    return (    
             !editing && name ?
                <Grid item xs={ 12 } className={classes.display} onClick={ ()=> setEditing(true) }>
                    <Typography variant="h6" className={classes.typo}>{ name } </Typography>
                </Grid>
            :
                <Grid item xs={ 12 } className={classes.root}>
                    <TextField
                        fullWidth
                        label={'Name'}
                        value={ name === undefined ? "" : name }
                        onChange={(e) => edit(e.target.value)}
                    />
                    {props.children}
                </Grid>
    )

};

export default ActivityName