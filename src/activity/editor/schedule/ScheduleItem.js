import React, { memo }  from 'react';
import ScheduleIcon from '@mui/icons-material/Schedule';
import TuneIcon from '@mui/icons-material/Tune';
import CardBase from 'components/CardBase'
import CardLine from 'components/CardLine'
import CardLineIcon from 'components/CardLineIcon'
import CardLineText from 'components/CardLineText'

function ScheduleItem(props) {
    
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];  
   
    function dateOnly(full) {
        if (full==='never') {
            return 'never'
        }
        var donly=full.replace('Z','').split('T')[0]
        var ymd=donly.split('-')
        var monthname=monthNames[parseInt(ymd[1])-1]
        return monthname+" "+ymd[2]+", "+ymd[0]
    }

    function timeOnly(full) {
        
        if (full==='never') {
            return ''
        }
        var tonly=full
        if (full.includes('T')) {
            tonly=full.replace('Z','').split('T')[1]
        }
        
        var hms=tonly.split(':')
        
        if (parseInt(hms[0])>12) {
            return parseInt(hms[0])-12+":"+hms[1]+"p"
        } else if (parseInt(hms[0])>1) {
            return parseInt(hms[0])+":"+hms[1]+"a"
        } else {
            return "12:"+hms[1]+"a"
        }
    }

    function titleCase(days) {

        for (var i = 0; i < days.length; i++) {
            // You do not need to check if i is larger than splitStr length, as your for does that for you
            // Assign it back to the array
            days[i] = days[i].charAt(0).toUpperCase() + days[i].substring(1);     
        }
        // Directly return the joined string
        return days.join('-'); 
}
    
    function textSched(sched) {
        if (sched.type==='interval') {
            return 'Every '+sched.interval+" "+sched.unit+" at "+timeOnly(sched.start)
        } else {
            return 'On '+titleCase(sched.days)+" at "+timeOnly(sched.start)
        }
    }

    return (
        <CardBase>
            <CardLine>
                <CardLineIcon on={true}><TuneIcon /></CardLineIcon>
                <CardLineText primary={props.name} secondary={"Last: "+dateOnly(props.automation.lastrun)+" "+timeOnly(props.automation.lastrun)} 
                                onClick={ () => props.select(props.name) } />
            </CardLine>                
            { props.automation.schedules.map((sched,index) =>
            <CardLine key={index} >
                <CardLineIcon on={true}><ScheduleIcon /></CardLineIcon>
                <CardLineText  primary={textSched(sched)} secondary={"Next: "+dateOnly(props.automation.nextrun)+" "+timeOnly(props.automation.nextrun)} 
                                onClick={ () => props.select(props.name) } />
            </CardLine> 
            )}
        </CardBase>
    )
}

export default memo(ScheduleItem)