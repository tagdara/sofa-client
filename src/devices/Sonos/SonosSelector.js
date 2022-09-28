import React from 'react';
import usePowerState from 'endpoint-model/property/powerState/usePowerState'
import SonosCard from 'devices/Sonos/SonosCard'
import StackCard from 'layout/components/StackCard'
import { endpointIdByFriendlyName } from 'endpoint-model/discovery'
import usePlaybackStateReporter from 'endpoint-model/controller/PlaybackStateReporter/usePlaybackStateReporter'

const SonosSelector = props => {
    
    const bedroomFloor = endpointIdByFriendlyName('Bedroom Floor')
    const tvLight = endpointIdByFriendlyName('Living Room TV Light')
    const { powerStateBool: floorLightPower } = usePowerState(bedroomFloor)
    const { powerStateBool: tvLightPower } = usePowerState(tvLight)
    const { playbackState } = usePlaybackStateReporter(props.endpointId)

    if ( 1==1 || playbackState ==='PLAYING' || ( floorLightPower && !tvLightPower )) { 
        return (
            <StackCard hidden={props.hidden}>
                <SonosCard endpointId = {props.endpointId} />
            </StackCard>
        )
    }        
        
    return null 

}


export default SonosSelector

