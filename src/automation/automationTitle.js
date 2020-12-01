import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

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
             !edit ?
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
