import React from 'react';
import Segment from 'components/Segment'

export default function TimeRangeSegment(props) {
    
    const strToTime = timeStr => {
        var target = new Date("1970-01-01 " + timeStr);
        return target
    }

    const startVal = strToTime(props.item.value.start)
    const endVal = strToTime(props.item.value.end)

    return (
        <Segment>
            { startVal +" - " + endVal }
        </Segment>
    );

}