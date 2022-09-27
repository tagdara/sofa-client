import React from 'react';
import usePowerState from 'endpoint-model/property/powerState/usePowerState'
import useInput from 'endpoint-model/property/input/useInput'
import { friendlyNameByEndpointId } from 'endpoint-model/discovery'
import AppleTVArtOverlay from 'devices/AppleTV/AppleTVArtOverlay'
import AppleTVButtons from 'devices/AppleTV/AppleTVButtons'
import AppleTVPullUp from 'devices/AppleTV/AppleTVPullUp'
import usePullUp from 'layout/pullup/usePullUp'
import StackCard from 'layout/components/StackCard'

const AppleTV = props => {
  
    const { powerStateBool: tvOn } = usePowerState(props.tv)
    const { inputLabel: tvInput } = useInput(props.tv)
    const name = friendlyNameByEndpointId(props.endpointId) 
    const { pullUpActive, showPullUp } = usePullUp('AppleTvHero', name)

    if (props.tv && (!tvOn || tvInput !== "Apple TV")) { return null }

    return (
        <StackCard hidden={props.hidden}>
            <AppleTVArtOverlay endpointId={props.endpointId} onClick={showPullUp} >
                <AppleTVButtons  endpointId={props.endpointId} />
            </AppleTVArtOverlay>
            { pullUpActive && <AppleTVPullUp endpointId={props.endpointId} /> }
        </StackCard>
    );
}


export default AppleTV;
