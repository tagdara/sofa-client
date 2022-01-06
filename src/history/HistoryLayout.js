import React, { useState, useEffect } from 'react';
import { Button, Group } from '@mantine/core';
import { getHistoryForDevice, friendlyNameByEndpointId } from 'store/deviceHelpers';

import HistoryLine from 'history/HistoryLine';
import PageFrame from 'layout/PageFrame'
import SectionGrid from 'layout/SectionGrid'
import SectionHeader from 'layout/SectionHeader';
import SectionDivider from 'layout/SectionDivider';
import SectionFrame from 'layout/SectionFrame';

export default function HistoryLayout(props) {

    const [history, setHistory] = useState([])
    const [page, setPage] = useState(0)
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const dayNames = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
    //const { getHistoryForDevice } = useRef(useContext(DataContext)).current;
    
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
            var val = history[j][props.property]
            if (hdate.getMonth()!==curmonth || hdate.getDate()!==curday) {
                if (current_parent) { datesorted.push(current_parent) }
                curmonth=hdate.getMonth()
                curday=hdate.getDate()
                var labelName = dayNames[hdate.getDay()]+", "+monthNames[curmonth]+" "+curday
                datesorted.push(<SectionDivider key={labelName+"-d"} label={labelName} />)
                current_parent = <SectionGrid key={labelName} children={[]} />
                // current_parent = <GridSection key={labelName} name={labelName} children={[]} />
            }
            current_parent.props.children.push(<HistoryLine justTime={true} key={val+hdate.toISOString()} val={val} time={ history[j].time } />)
        }
        datesorted.push(current_parent)
        return datesorted
    }
    
    const name = friendlyNameByEndpointId(props.endpointId)

    return (   
        <PageFrame> 
            <SectionHeader title={"Device History for " + name} />
            <SectionFrame>
                <Group direction="column" style={{ width: "100%"}} >
                    { todayEvents(true) }
                </Group>
            </SectionFrame>
            <SectionHeader>
                <Button fullWidth variant="light" onClick={ () => getMore() }>
                    More
                </Button>
            </SectionHeader>
        </PageFrame>
    )

};