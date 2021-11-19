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
        display: "flex",
    },
    display: {
        alignItems: "center",
        padding: "0 16px",
        display: "flex",
        justifyContent: "space-between",
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
    const name = useActivityEditorStore( state => state.activity.name )
    const [ editing, setEditing ] = useState(!name)    

    function edit(newName) {
        useActivityEditorStore.setState({ activity: { name: newName }})
    }

    return (    
        !editing ?
            <Grid item xs={ 12 } className={classes.display} onClick={ ()=> setEditing(true) }>
                <Typography variant="h6" className={classes.typo}>{ name } </Typography>
                {props.children}
            </Grid>
        :
            <Grid item xs={ 12 } className={classes.root}>
                <TextField
                    size="small"
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