import React, { useState, useEffect } from 'react';

import { deviceStatesAreEqual, dataFilter } from 'DataContext/DataFilter'
import Speaker from 'devices/Speaker/Speaker';

const SpeakerList = React.memo(props => {
    
    const [ speakers, setSpeakers]=useState([])

    // since this component doesn't actually want the devicestates, we should refactor this part to just use
    // device context

    useEffect(() => {
        var speakerList = props.addEndpointIds('category','SPEAKER')
        setSpeakers(speakerList)
    // eslint-disable-next-line 
    }, [])

    return (
        <>
            { speakers.map( endpointId => 
                <Speaker key={endpointId} filterOff={props.filterOff} endpointId={endpointId} />
            )}
        </>
    )

}, deviceStatesAreEqual);

export default dataFilter(SpeakerList);