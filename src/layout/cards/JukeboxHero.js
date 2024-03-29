import React from 'react';
import Jukebox from 'devices/Jukebox/Jukebox'
import StackCard from 'layout/components/StackCard'
import SonosSelector from 'devices/Sonos/SonosSelector'

const JukeboxHero = props => {

    return (
        <>
            <StackCard  hidden={props.hidden}>
                <Jukebox endpointId="jukebox" url="https://jukebox.dayton.tech" />
            </StackCard>
            <SonosSelector  hidden={props.hidden} endpointId="sonos:player:RINCON_B8E9378E1E8001400" />
        </>
    );
}

export default JukeboxHero;

