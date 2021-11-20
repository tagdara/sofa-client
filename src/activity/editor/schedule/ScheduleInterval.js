import React from 'react';
import { makeStyles } from '@mui/styles';
import Grid from '@mui/material/Grid';
import CardLine from 'components/CardLine'
import CardLineIcon from 'components/CardLineIcon'
import CardLineText from 'components/CardLineText'
import TextField from  '@mui/material/TextField';
import ScheduleIcon from '@mui/icons-material/Schedule';

import TimeUnitButton from 'activity/editor/input/TimeUnitButton';

const useStyles = makeStyles({
    shortLabel: {
        flexGrow:0,
    },
    input: {
        marginTop:0,
        flexGrow:0,
        marginBottom:0,
        maxWidth: 50,
        marginRight: 16,
    },
    flex: {
        display: "flex",
        padding: 0,
    },
});

export default function ScheduleInterval(props) {
    
    const classes = useStyles();

    function changeUnit(newunit) {
        props.change('unit', newunit)    
    }
    
    return (
        <Grid item xs={props.wide ? 4 : 12 } className={classes.flex} >
            <CardLine> 
                <CardLineIcon onClick={props.toggle}><ScheduleIcon /></CardLineIcon>
                <CardLineText primary="Every" />
                <TextField 
                    sx={{ width: 100}}
                    size="small"
                    id = {'specint'}
                    type="number"
                    value={props.value}
                    inputProps={{ maxLength: 4 }}
                    onChange={(e) => props.change('interval', e.target.value)}
                />
                <TimeUnitButton value={props.unit} setUnit={changeUnit} />
            </CardLine>
        </Grid>
    )
}
