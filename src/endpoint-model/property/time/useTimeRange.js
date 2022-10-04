import { useEffect } from 'react';

const useTimeRange = ( endpointId, value, directive) => {

    const activeDirective = directive
    const timeRange = value?.time
    const presets = ['sunrise', 'sunset']

    useEffect(() => {
        // set default in activity editor
        if (directive && value === undefined) {
            setTimeRange( { start: "9:00", end: "17:00"})
        }
    // eslint-disable-next-line 
    }, [  ]);   

    const strToTime = timeStr => {
        try {
            var dateStr = "1970-01-01 " + timeStr
            var target = new Date(dateStr);
            return target
        }
        catch(e) {
            console.log('error in strtotime', e)
        }
    }

    function formatAMPM(date) {
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0'+minutes : minutes;
        var strTime = hours + ':' + minutes + ' ' + ampm;
        return strTime;
    }



    const timeToStr = timeValue => {
        try {
            if (typeof timeValue === "string") {
                if (presets.includes(timeValue ) || ( timeValue.includes('+') && presets.includes(timeValue.split('+')[0]) )) {
                    return timeValue
                }
            }
            var datetext = timeValue.toTimeString().split(' ')[0];
            var dateHHMM = datetext.split(':')[0]+":"+datetext.split(':')[1]
            return dateHHMM
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

    const startLabel = startTime ? formatAMPM(startTime) : "start"
    const endLabel = endTime ? formatAMPM(endTime) : "end"
    const timeRangeLabel = startLabel + " - " + endLabel

    return { timeRange, startTime, endTime, startLabel, endLabel, timeRangeLabel, setTimeRange, setStartTime, setEndTime, strToTime}

}

export default useTimeRange;
