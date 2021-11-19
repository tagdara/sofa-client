import React from 'react';
import CardLine from 'components/CardLine';
import Grid from '@mui/material/Grid';
import ToggleButton from 'components/ToggleButton';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
    flex: {
        display: "flex",
        padding: 0,
    },
});

export default function ScheduleDays(props) {

    const classes = useStyles();
    const daysOfTheWeek = ['sun','mon','tue','wed','thu','fri','sat'];

    function editDays(day) {
        var sdays=[]
        if (props.value) {
            sdays=props.value 
        }
        if (sdays.includes(day)) {
            sdays.splice(sdays.indexOf(day),1)
        } else {
            sdays.push(day)
        }
        props.change('days', sdays)
    }
    
    return (
        <Grid item xs={props.wide ? 12 : 4 } className={classes.flex} >
            <CardLine>
                { daysOfTheWeek.map((day) => 
                    <ToggleButton key={day} label={day} buttonState={props.value && props.value.includes(day) ? 'on' : 'off' } onClick={(e) => editDays(day)} >
                        {day}
                    </ToggleButton>
                    )
                }
            </CardLine>
        </Grid>
    )
}
