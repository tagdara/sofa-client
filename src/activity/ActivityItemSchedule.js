import React from 'react';
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import localizedFormat from 'dayjs/plugin/localizedFormat';

import { Badge, Stack } from '@mantine/core';
import useDefinitionController from 'endpoint-model/controller/DefinitionController/useDefinitionController'
import { IconCalendar } from '@tabler/icons';


const ActivityItemSchedule = props => {
    const { lastRun, countData, nextRun } = useDefinitionController(props.endpointId)

    if ( !props.scheduled || !countData?.schedules_count) { 
        return null 
    }

    dayjs.extend(utc);
    dayjs.extend(timezone);   
    dayjs.extend(localizedFormat) 

    const clientTimeZone = dayjs.tz.guess()
    const lastRunDisplay = dayjs(lastRun).tz(clientTimeZone).format('llll')
    const nextRunDisplay = dayjs(nextRun).tz(clientTimeZone).format('llll')

    return (
        <Stack spacing={4}>
            <Badge 
                color="gray"
                size={"lg"}
                radius={"md"}
                leftSection={<IconCalendar size={10} />}
                styles={{ 
                    root: {
                        textTransform: "unset"
                    }
                }}
            >
                Last: {lastRunDisplay}
            </Badge>
            <Badge 
                color="gray"
                size={"lg"}
                radius={"md"}
                leftSection={<IconCalendar size={10} />}
                styles={{ 
                    root: {
                        textTransform: "unset"
                    }
                }}
            >
                Next: {nextRunDisplay}
            </Badge>
        </Stack>
    )
}

export default ActivityItemSchedule;

