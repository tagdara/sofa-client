import React from 'react';
import { ActionIcon, Group, NumberInput } from '@mantine/core';
import { IconClock } from '@tabler/icons';
import useDuration from "endpoint-model/property/duration/useDuration"

export default function DurationInput(props) {

    const { duration, setDuration } = useDuration(props.endpointId, props.value, props.directive)

    return (
        <Group noWrap spacing={0}>
            <ActionIcon size="lg" variant="light" >
                <IconClock size={16} />
            </ActionIcon>
            <NumberInput
                value={duration}
                onChange={setDuration}
                defaultValue={null}
                placeholder="Offset"             
            />
        </Group>
    )
}