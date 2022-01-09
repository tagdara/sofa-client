import React from 'react';
import Segment from 'components/Segment'
import moment from 'moment';

export default function TimeRangeSegment(props) {

    console.log('trsp', props)
    
    const strToTime = timeStr => {
        var target = new Date("1970-01-01 " + timeStr);
        return target
    }

    const startVal = strToTime(props.item.value.start)
    const endVal = strToTime(props.item.value.end)
    const startLabel = moment(startVal).format("h:MMa")
    const endLabel = moment(endVal).format("h:MMa")

    return (
        <Segment size={props.size}>
            { startLabel +" - " + endLabel }
        </Segment>
    );

}