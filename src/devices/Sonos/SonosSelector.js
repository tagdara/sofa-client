import React from 'react';
import usePowerState from 'endpoint-model/property/powerState/usePowerState'
import SonosCard from 'devices/Sonos/SonosCard'
import StackCard from 'layout/components/StackCard'
import { endpointIdByFriendlyName } from 'endpoint-model/discovery'
import usePlaybackState from 'endpoint-model/property/playbackState/usePlaybackState'

const SonosSelector = props => {
    
    const bedroomFloor = endpointIdByFriendlyName('Bedroom Floor')
    const tvLight = endpointIdByFriendlyName('Living Room TV Light')
    const { powerStateBool: floorLightPower } = usePowerState(bedroomFloor)
    const { powerStateBool: tvLightPower } = usePowerState(tvLight)
    const { playbackState } = usePlaybackState(props.endpointId)

    if ( playbackState ==='PLAYING' || ( floorLightPower && !tvLightPower )) { 
        return (
            <StackCard>
                <SonosCard endpointId = {props.endpointId} />
            </StackCard>
        )
    }        
        
    return null 

}


export default SonosSelector

