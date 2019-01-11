import React from 'react';
import { useState, useEffect } from 'react';
import { withData } from './DataContext/withData';

import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';

import HistoryLine from './HistoryLine';
import GridBreak from './GridBreak';


function HistoryLayout(props) {

    const [history, setHistory] = useState([])
    const [page, setPage] = useState(0)
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const dayNames = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
    
    useEffect(() => {
        props.getHistoryForDevice(props.endpointId, props.property,0).then(result => setHistory(result))
    }, []);
    

    function getMore() {
        setPage(page+1)
        props.getHistoryForDevice(props.endpointId, props.property, page).then(result => setHistory([...history, ...result]))
    }
    
    function todayEvents(today) {
        var datesorted=[]
        var curmonth=''
        var curday=''
        for (var j = 0; j < history.length; j++) {
            var hdate=new Date(history[j].time)
            if (hdate.getMonth()!=curmonth || hdate.getDate()!=curday) {
                curmonth=hdate.getMonth()
                curday=hdate.getDate()
                datesorted.push(<GridBreak key={'lab'+j} label={dayNames[hdate.getDay()]+", "+monthNames[curmonth]+" "+curday} />)
            }
            datesorted.push(<HistoryLine justTime={true} key={j} val={history[j][props.property]} time={ history[j].time } />)
        }
        return datesorted
    }
    
    function filterByType(zonetype) {
        var typezones=[]
        var allzones=props.devicesByCategory('ZONE')
        for (var j = 0; j < props.devicesByCategory('ZONE').length; j++) {
            if (props.deviceProperties[allzones[j].friendlyName].type==zonetype) {
                typezones.push(allzones[j])
            }
        }
        return typezones
            
    }
    
    return (    
        <React.Fragment>
            <GridBreak label={"Device History for "+props.name} />
            { todayEvents(true) }
            <GridBreak>
                <Button onClick={ () => getMore() }>
                    More
                </Button>
            </GridBreak>
        </React.Fragment>
    )

};

export default withData(HistoryLayout);