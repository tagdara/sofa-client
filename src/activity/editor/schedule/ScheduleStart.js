import React from 'react';
import { Group } from '@mantine/core';
import { DatePicker, TimeInput} from '@mantine/dates';
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';


export default function ScheduleStart(props) {
    dayjs.extend(utc);
    dayjs.extend(timezone);
    const dateValue = props.value ? dayjs(props.value).toDate() : null
    const clientTimeZone = dayjs.tz.guess()
    const localDateValue = dayjs.tz(dateValue, clientTimeZone).toDate()
    console.log('props.value', props.value, dateValue)
    console.log('local', localDateValue)

    const applyChange = ( value) => {
        console.log("changes", props.target, value, value.toISOString())
        props.change(props.target, value.toISOString())
    }

    return (
            <Group noWrap spacing={2}>
                <DatePicker size="xs" style={{ padding: 2 }} placeholder="Start date" required value={ localDateValue } onChange={applyChange} />
                <TimeInput size="xs"  style={{ padding: 2 }} format="12" placeholder="time" required value={ localDateValue } onChange={applyChange} />
            </Group>
    )
}
