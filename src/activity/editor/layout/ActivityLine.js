import React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

const ActivityLine = props => {

    return (
        <Paper elevation={0} onClick={props.onClick} sx={{ width: "100%"}}>
            <Grid container xs={12} >
                { props.children }
            </Grid>
        </Paper>
    )
}

export default ActivityLine