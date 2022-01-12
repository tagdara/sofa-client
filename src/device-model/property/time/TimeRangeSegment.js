import React from 'react';
import SegmentPopover from 'components/SegmentPopover'
import TimeSelect from 'device-model/property/time/TimeSelect'
import Segment from 'components/Segment'
import { Group } from '@mantine/core';
import useTimeRange from 'device-model/property/time/useTimeRange'

export default function TimeRangeSegment(props) {

    const { startLabel, endLabel, startTime, endTime, setStartTime, setEndTime } = useTimeRange(props.endpointId, props.value, props.directive)

    return (
        <Group spacing={0} noWrap>
            <SegmentPopover position="start" minWidth={200} size={props.size} value={ startLabel } popOver={<TimeSelect {...props} setTime={setStartTime} value={startTime} />} />
            <Segment position="middle" size={props.size}>{ " - " }</Segment>
            <SegmentPopover position="end" minWidth={200} size={props.size} value={ endLabel } popOver={<TimeSelect {...props} value={endTime} setTime={setEndTime}  />} />
        </Group>
    );

}