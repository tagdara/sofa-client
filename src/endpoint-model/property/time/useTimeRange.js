import moment from 'moment';
import { useEffect } from 'react';

const useTimeRange = ( endpointId, value, directive) => {

    console.log('tr value', value)
    const activeDirective = directive
    const timeRange = value 
    const presets = ['sunrise', 'sunset']

    useEffect(() => {
        // set default in activity editor
        if (directive && value === undefined) {
            setTimeRange( { start: "9:00", end: "17:00"})
        }
    // eslint-disable-next-line 
    }, [  ]);   

    const strToTime = timeStr => {
        var target = new Date("1970-01-01 " + timeStr);
        return target
    }

    const timeToStr = timeValue => {
        try {
            if (typeof timeValue === "string") {
                if (presets.includes(timeValue ) || ( timeValue.includes('+') && presets.includes(timeValue.split('+')[0]) )) {
                    return timeValue
                }
            }
            return moment(timeValue).format("H:mm")
        }
        catch (e) {
            console.log('!! bad time', timeValue, e)
        }
        return undefined
    }

    const startTime = timeRange?.start ? strToTime(timeRange.start) : undefined
    const endTime = timeRange?.end ? strToTime(timeRange.end) : undefined

    const setTimeRange = newRange => {
        const newStart = timeToStr(newRange.start)
        const newEnd = timeToStr(newRange.end)
        if (newStart && newEnd) {
            activeDirective(endpointId, "Sofa.LogicController", "setTime", { "time" : { start: newStart, end: newEnd }})
        }
    }
 
    const setStartTime = newTime => {
        const newStart = timeToStr(newTime)
        if (newStart) {
            activeDirective(endpointId, "Sofa.LogicController", "setTime", { "time" : { start: newStart, end: timeRange?.end  }})
        }
    }

    const setEndTime = newTime => {
        const newEnd = timeToStr(newTime)
        if (newEnd) {
            activeDirective(endpointId, "Sofa.LogicController", "setTime", { "time" : { start: timeRange?.start, end: newEnd }})
        }
    }

    const startLabel = startTime ? moment(startTime).format("h:mma") : "start"
    const endLabel = endTime ? moment(endTime).format("h:mma") : "end"
    const timeRangeLabel = startLabel + " - " + endLabel

    return { timeRange, startTime, endTime, startLabel, endLabel, timeRangeLabel, setTimeRange, setStartTime, setEndTime, strToTime}

}

export default useTimeRange;
