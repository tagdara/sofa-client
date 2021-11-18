import React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import ActivityItemActions from 'activity/editor/layout/ActivityItemActions';

const ActivityLine = props => {

    return (
        <Paper elevation={0} onClick={props.onClick} sx={{ display: "flex", borderRadius:4, width: "100%"}}>
            <Grid container>
                { props.children }
            </Grid>
            <ActivityItemActions    category={ props.category } 
                                    index={props.index} 
                                    wide={props.wide} 
                                    removing={props.removing} 
                                    reordering={props.reordering} 
                                    count={props.count} 
                                />
        </Paper>
    )
}

export default ActivityLine