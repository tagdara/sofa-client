import React, { useState } from 'react';
import { ActionIcon, Group, NumberInput, Text } from '@mantine/core';
import TimeEntryType from 'device-model/property/time/TimeEntryType'
import TimeSelect from 'device-model/property/time/TimeSelect'
import { Clock } from 'react-feather'

export default function TimeEntry(props) {

    const [timeType, setTimeType] = useState('custom')
    const [ selecting, setSelecting] = useState(false)

    return (
        <Group noWrap spacing={0}>
            <ActionIcon size="lg" variant="light" onClick= {()=> setSelecting(!selecting) } >
                <Clock size={16} />
            </ActionIcon>

            { selecting && <TimeEntryType value={timeType} select={setTimeType} /> }
            { ( !selecting && timeType === "custom") &&
                <TimeSelect change={props.change} value={props.value} />
            }
            { ( !selecting && timeType !== "custom") &&
            <Group noWrap grow>
                <Text>{ timeType }</Text>
                <NumberInput
                    defaultValue={null}
                    placeholder="Offset"             
                />
            </Group>
            }
        </Group>
    )
}