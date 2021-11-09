import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

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

export default function AutomationTitle(props) {

    const classes = useStyles();
    const [ edit, setEdit ]=useState(false)
    
    function editTitle(newvalue) {
        props.save('title',newvalue)
    }

    return (    
             !edit && props.name ?
                <Grid item xs={ 12 } className={classes.display} onClick={ ()=> setEdit(true) }>
                    <Typography variant="h6" className={classes.typo}>{ props.name } </Typography>
                </Grid>
            :
                <Grid item xs={ 12 } className={classes.root}>
                    <TextField
                        fullWidth
                        label={'Name'}
                        value={ props.name===undefined ? "" : props.name }
                        onChange={(e) => editTitle(e.target.value)}
                    />
                    {props.children}
                </Grid>
    )

};
