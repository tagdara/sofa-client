import React from 'react';

import ActivityLineSegment from 'activity/editor/layout/ActivityLineSegment'

import CardLine from 'components/CardLine'
import CardLineText from 'components/CardLineText'
import CardLineIcon from 'components/CardLineIcon'
import DateAdapter from '@mui/lab/AdapterMoment';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';

import TextField from  '@mui/material/TextField';
import EventIcon from '@mui/icons-material/Event';

export default function ScheduleStart(props) {
    
    return (
        <>
            <ActivityLineSegment wide={props.wide}>
                <CardLine >
                    <CardLineIcon>
                        <EventIcon />
                    </CardLineIcon>
                    <CardLineText primary="Starting" />
                </CardLine>
            </ActivityLineSegment>
            <ActivityLineSegment wide={props.wide}>
                <CardLine>
                    <LocalizationProvider dateAdapter={DateAdapter}>
                        <DateTimePicker
                            size="small"
                            renderInput={(props) => <TextField size="small" {...props} />}
                            label="DateTimePicker"
                            value={ props.value }
                            onChange={newValue =>  props.change(props.target, newValue)}
                        />
                    </LocalizationProvider>
                </CardLine>
            </ActivityLineSegment>
        </>
    )
}
