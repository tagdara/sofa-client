import React from 'react';
import { makeStyles } from '@mui/styles';

// import DateTimePicker from '@mui/lab/DateTimePicker';
import Grid from '@mui/material/Grid';

import CardLine from 'components/CardLine'
import CardLineText from 'components/CardLineText'
import CardLineIcon from 'components/CardLineIcon'

//import AdapterDateFns from '@mui/lab/AdapterDateFns';
import DateAdapter from '@mui/lab/AdapterMoment';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';

import TextField from  '@mui/material/TextField';
import EventIcon from '@mui/icons-material/Event';

const useStyles = makeStyles({
    shortLabel: {
        flexGrow:0,
    },
    label: {
        flexGrow:1,
        flexBasis:0,
        padding: 0,
    },
    input: {
        marginLeft:8,
        marginTop:0,
        flexGrow:0,
        marginBottom:0,
        padding: 0,
    },
    holder: {
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        flexDirection: "row",
    },
    datePickerRoot: {
        padding: 12,
    }
});


export default function ScheduleStart(props) {
    
    const classes = useStyles();

    return (
        <>
        <Grid item xs={props.wide ? 12 : 4 } >
            <CardLine >
                <CardLineIcon>
                    <EventIcon />
                </CardLineIcon>
                <CardLineText primary="Starting" />
            </CardLine>
        </Grid>
        <Grid item xs={props.wide ? 12 : 4 } className={classes.holder} >
            <LocalizationProvider dateAdapter={DateAdapter}>
                <DateTimePicker
                    size="small"
                    renderInput={(props) => <TextField size="small" {...props} />}
                    label="DateTimePicker"
                    value={ props.value }
                    onChange={newValue =>  props.change(props.target, newValue)}
                />
            </LocalizationProvider>
        </Grid>
        </>
    )
}
