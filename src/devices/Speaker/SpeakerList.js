import React from 'react';
import Speaker from 'devices/Speaker/Speaker';
import { sortByName, endpointIdsByDisplayCategory } from 'endpoint-model/discovery'

const SpeakerList = props => {
    
    const allSpeakers = endpointIdsByDisplayCategory( "SPEAKER")    
    const sortedSpeakers = sortByName(allSpeakers)
    const speakers = props.exclude ? sortedSpeakers.filter( endpointId => ( !props.exclude.includes(endpointId) ) ) : sortedSpeakers

    return (
        <>
            { speakers.map( endpointId => 
                <Speaker key={endpointId} filterOff={props.filterOff} endpointId={endpointId} inList={true} />
            )}
        </>
    )
}

export default SpeakerList;