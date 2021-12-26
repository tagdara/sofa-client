import React, { useState } from 'react';
import { ActionIcon, Group, Text } from '@mantine/core';
import TimeEntryType from 'device-model/property/time/TimeEntryType'
import TimeSelect from 'device-model/property/time/TimeSelect'
import { Clock } from 'react-feather'

export default function TimeEntry(props) {

    const [timeType, setTimeType] = useState('custom')
    const [ selecting, setSelecting] = useState(false)
    const [ value, setValue] = useState(null)

    return (
        <Group noWrap>
            <ActionIcon onClick= {()=> setSelecting(!selecting) } >
                <Clock size={16} />
            </ActionIcon>

            { selecting && <TimeEntryType value={timeType} select={setTimeType} /> }
            { ( !selecting && timeType === "custom") &&
                <TimeSelect select={setValue} value={value} />
            }
            { ( !selecting && timeType !== "custom") &&
                <Text>{ timeType }</Text>
            }
        </Group>
    )
}