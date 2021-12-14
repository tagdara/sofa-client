import React from 'react';
import Jukebox from 'beta/devices/Player/Jukebox'
import StackCard from 'beta/components/StackCard'
const JukeboxHero = props => {
    
    return (
        <StackCard>
            <Jukebox endpointId="jukebox" url="https://jukebox.dayton.tech" />
        </StackCard>
    );
}

export default JukeboxHero;

