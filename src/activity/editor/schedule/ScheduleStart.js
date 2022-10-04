import React from 'react';
import { Group } from '@mantine/core';
import { DatePicker, TimeInput} from '@mantine/dates';
import dayjs from 'dayjs'

export default function ScheduleStart(props) {

    console.log('props.value', props.value)
    const dateValue = props.value ? dayjs(props.value).toDate() : null
    console.log('props.value', props.value, dateValue)

    return (
            <Group noWrap spacing={2}>
                <DatePicker size="xs" style={{ padding: 2 }} placeholder="Start date" required value={ dateValue } onChange={newValue =>  props.change(props.target, newValue)} />
                <TimeInput size="xs"  style={{ padding: 2 }} placeholder="time" required value={ dateValue } onChange={newValue =>  props.change(props.target, newValue)} />
            </Group>
    )
}
