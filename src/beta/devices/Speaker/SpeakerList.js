import React from 'react';
import Speaker from 'beta/devices/Speaker/Speaker';
import { endpointIdsByDisplayCategory } from 'store/deviceHelpers'

const SpeakerList = props => {
    
    const speakers = endpointIdsByDisplayCategory( "SPEAKER")    

    return (
        <>
            { speakers.map( endpointId => 
                <Speaker key={endpointId} filterOff={props.filterOff} endpointId={endpointId} inList={true} />
            )}
        </>
    )
}

export default SpeakerList;