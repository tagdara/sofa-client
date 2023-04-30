import React from 'react';
import usePowerState from 'endpoint-model/property/powerState/usePowerState'
import useInput from 'endpoint-model/property/input/useInput'
import { friendlyNameByEndpointId } from 'endpoint-model/discovery'
import AppleTVPullUp from 'devices/AppleTV/AppleTVPullUp'
import usePullUp from 'layout/pullup/usePullUp'
import StackCard from 'layout/components/StackCard'
import Player from 'devices/Player/Player'
import { IconBrandApple } from '@tabler/icons';
import PowerStateSwitch from 'endpoint-model/property/powerState/PowerStateSwitch'

const AppleTV = props => {
  
    const { powerStateBool: tvOn } = usePowerState(props.tv)
    const { inputLabel: tvInput } = useInput(props.tv)
    const name = friendlyNameByEndpointId(props.endpointId) 
    const { pullUpActive, showPullUp } = usePullUp('AppleTvHero', name)

    if (props.tv && (!tvOn || tvInput !== "Apple TV")) { return null }
    
    if (!props.endpointId || !name) { return null }

    return (
        <StackCard hidden={props.hidden}>
            <Player 
                aspect="video"
                placeholder={<IconBrandApple style={{ height: "100%", maxWidth: "30%" }} />} 
                endpointId={props.endpointId} 
                onClick={showPullUp}
                buttons={
                    <PowerStateSwitch endpointId={props.endpointId} />  
                }
            />
            { pullUpActive && <AppleTVPullUp endpointId={props.endpointId} /> }
        </StackCard>
    );
}


export default AppleTV;
