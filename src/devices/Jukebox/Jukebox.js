import React from 'react';
import Player from 'devices/Player/Player'
import useMultiPower from 'endpoint-model/multidevice/useMultiPower'
import { endpointIdsByDisplayCategory } from 'endpoint-model/discovery'
import JukeboxOff from 'devices/Jukebox/JukeboxOff'
import usePullUp from 'layout/pullup/usePullUp'
import JukeboxPullUp from 'devices/Jukebox/JukeboxPullUp'
import JukeboxSpeakerButton from 'devices/Jukebox/JukeboxSpeakerButton'
import { friendlyNameByEndpointId } from 'endpoint-model/discovery'
import usePlaybackStateReporter from 'endpoint-model/controller/PlaybackStateReporter/usePlaybackStateReporter'

const JukeboxHero = props => {

    const { playbackState } = usePlaybackStateReporter(props.endpointId)
    const name = friendlyNameByEndpointId(props.endpointId) 
    const { showPullUp } = usePullUp(name)

    const excludeSpeakers = ['jukebox', 'sonos:player:RINCON_B8E9378E1E8001400' ]
    const speakers = endpointIdsByDisplayCategory( "SPEAKER").filter(item => !excludeSpeakers.includes(item))
    const { onCount } = useMultiPower(speakers)

    const isIdle = ['IDLE','STOPPED'].includes(playbackState) 

    return (
        <>
            { ( isIdle && !onCount ) ?
                <JukeboxOff onClick={showPullUp} name={"Jukebox"} endpointId={props.endpointId} />           
            :
                <Player 
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

