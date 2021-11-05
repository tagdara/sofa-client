import React from 'react';
import Speaker from 'devices/Speaker/Speaker';
import { endpointIdsByDisplayCategory } from 'store/deviceHelpers'

const SpeakerList = props => {
    
    const speakers = endpointIdsByDisplayCategory( "SPEAKER")    

    return (
        <>
            { speakers.map( endpointId => 
                <Speaker key={endpointId} filterOff={props.filterOff} endpointId={endpointId} />
            )}
        </>
    )
}

export default SpeakerList;