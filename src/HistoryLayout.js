import React from 'react';
import { useState, useEffect, useContext } from 'react';
import { DeviceContext } from './DataContext/DeviceProvider';
import Button from '@material-ui/core/Button';

import HistoryLine from './HistoryLine';
import GridSection from './GridSection';


export default function HistoryLayout(props) {

    const [history, setHistory] = useState([])
    const [page, setPage] = useState(0)
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const dayNames = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
    //const { getHistoryForDevice } = useRef(useContext(DataContext)).current;
    const { getHistoryForDevice } = useContext(DeviceContext)
    
    useEffect(() => {
        getHistoryForDevice(props.endpointId, props.property, 0).then(result => setHistory(result))
    // eslint-disable-next-line 
    }, [props.property, props.endpointId]);
    

    function getMore() {
        setPage(page+1)
        getHistoryForDevice(props.endpointId, props.property, page).then(result => setHistory([...history, ...result]))
    }
    
    function todayEvents(today) {
        var datesorted=[]
        var curmonth=''
        var curday=''
        var current_parent=null
        for (var j = 0; j < history.length; j++) {
            var hdate=new Date(history[j].time)
            if (hdate.getMonth()!==curmonth || hdate.getDate()!==curday) {
                if (current_parent) { datesorted.push(current_parent) }
                curmonth=hdate.getMonth()
                curday=hdate.getDate()
                current_parent=<GridSection key={'lab'+hdate.toISOString()} name={dayNames[hdate.getDay()]+", "+monthNames[curmonth]+" "+curday} children={[]} />
            }
            current_parent.props.children.push(<HistoryLine justTime={true} key={hdate.toISOString()} val={history[j][props.property]} time={ history[j].time } />)
        }
        datesorted.push(current_parent)
        return datesorted
    }
    
    return (    
        <React.Fragment>
            <GridSection name={"Device History for "+props.name} scroll={true} />
            { todayEvents(true) }
            <Button onClick={ () => getMore() }>
                More
            </Button>
        </React.Fragment>
    )

};