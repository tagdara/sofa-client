import React from 'react';
import Jukebox from 'devices/Player/Jukebox'
import StackCard from 'layout/components/StackCard'
import SonosSelector from 'devices/Sonos/SonosSelector'

const JukeboxHero = props => {

    return (
        <>
        <StackCard>
            <Jukebox endpointId="jukebox" url="https://jukebox.dayton.tech" />
        </StackCard>
        <SonosSelector endpointId="sonos:player:RINCON_B8E9378E1E8001400" />
        </>
    );
}

export default JukeboxHero;

