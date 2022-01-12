import moment from 'moment';

const useTimeRange = ( endpointId, value, directive) => {

    const activeDirective = directive
    const timeRange = value 

    const strToTime = timeStr => {
        var target = new Date("1970-01-01 " + timeStr);
        return target
    }

    const startTime = strToTime(timeRange.start)
    const endTime = strToTime(timeRange.end)

    const setTimeRange = newRange => {
        const newStart = moment(newRange.start).format("H:mm")
        const newEnd = moment(newRange.end).format("H:mm")
        activeDirective(endpointId, "LogicController", "setTime", { "time" : { start: newStart, end: newEnd }})
    }
 
    const setStartTime = newTime => {
        const newStart = moment(newTime).format("H:mm")
        console.log('newstart', newStart, timeRange)
        activeDirective(endpointId, "LogicController", "setTime", { "time" : { start: newStart, end: timeRange.end }})
    }

    const setEndTime = newTime => {
        const newEnd = moment(newTime).format("H:mm")
        activeDirective(endpointId, "LogicController", "setTime", { "time" : { start: timeRange.start, end: newEnd }})
    }

    const startLabel = moment(startTime).format("h:mma")
    const endLabel = moment(endTime).format("h:mma")
    const timeRangeLabel = startLabel + " - " + endLabel

    return { timeRange, startTime, endTime, startLabel, endLabel, timeRangeLabel, setTimeRange, setStartTime, setEndTime, strToTime}

}

export default useTimeRange;
