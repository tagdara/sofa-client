import React from 'react';
import PlayerArt from 'devices/Player/PlayerArt'
import PlayerMediaInfo from 'devices/Player/PlayerMediaInfo'
import PlayerButtons from 'devices/Player/PlayerButtons'
import useMultiPower from 'endpoint-model/multidevice/useMultiPower'
import usePlaybackState from 'endpoint-model/property/playbackState/usePlaybackState'
import { endpointIdsByDisplayCategory } from 'endpoint-model/discovery'
import JukeboxOff from 'devices/Jukebox/JukeboxOff'
import usePullUp from 'layout/pullup/usePullUp'
import JukeboxPullUp from 'devices/Jukebox/JukeboxPullUp'
import JukeboxSpeakerButton from 'devices/Jukebox/JukeboxSpeakerButton'
import { friendlyNameByEndpointId } from 'endpoint-model/discovery'
import { Group, Stack } from '@mantine/core'

const JukeboxHero = props => {

    const { playbackState } = usePlaybackState(props.endpointId)
    const name = friendlyNameByEndpointId(props.endpointId) 
    const { pullUpActive, showPullUp } = usePullUp('JukeboxHero', name)

    const excludeSpeakers = ['jukebox', 'sonos:player:RINCON_B8E9378E1E8001400' ]
    const speakers = endpointIdsByDisplayCategory( "SPEAKER").filter(item => !excludeSpeakers.includes(item))
    const { onCount } = useMultiPower(speakers)

    const isIdle = ['IDLE','STOPPED'].includes(playbackState) 

    return (
        <>
            { ( isIdle && !onCount ) ?
                <JukeboxOff onClick={showPullUp} name={"Jukebox"} endpointId={props.endpointId} />           
            :
                <Group onClick={showPullUp} noWrap >
                    <PlayerArt endpointId={props.endpointId} />
                    <Stack>
                        <PlayerMediaInfo endpointId={props.endpointId} />
                        <PlayerButtons endpointId={props.endpointId} >
                            <JukeboxSpeakerButton endpointId={props.endpointId} onClick={showPullUp} />
                        </PlayerButtons>
                    </Stack>
                </Group>
            }
            { pullUpActive && <JukeboxPullUp endpointId={props.endpointId} /> }
        </>
    );
}

export default JukeboxHero;

