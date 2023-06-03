import React from 'react';
import JukeboxOff from 'devices/Jukebox/JukeboxOff'
import JukeboxPlayer from 'devices/Jukebox/JukeboxPlayer'
import usePullUp from 'layout/pullup/usePullUp'
import JukeboxPullUp from 'devices/Jukebox/JukeboxPullUp'
import JukeboxSpeakerButton from 'devices/Jukebox/JukeboxSpeakerButton'
import { friendlyNameByEndpointId } from 'endpoint-model/discovery'
import useRangeValue from 'endpoint-model/property/rangeValue/useRangeValue'

const JukeboxHero = props => {

    const name = friendlyNameByEndpointId(props.endpointId) 
    const { showPullUp } = usePullUp(name)
    const { rangeValue: activeSpeakerCount } = useRangeValue(props.endpointId, 'Speaker.Count')

    return (
        <>
            {  !activeSpeakerCount ?
                <JukeboxOff 
                    onClick={showPullUp} 
                    name={"Jukebox"} 
                    endpointId={props.endpointId} 
                    buttons={<JukeboxSpeakerButton endpointId={props.endpointId} onClick={showPullUp} />}
                />           
            :
                <JukeboxPlayer
                    endpointId={props.endpointId}
                    buttons={<JukeboxSpeakerButton endpointId={props.endpointId} onClick={showPullUp} />}
                    onClick={showPullUp}
                />
            }
            <JukeboxPullUp endpointId={props.endpointId} />
        </>
    );
}

export default JukeboxHero;

