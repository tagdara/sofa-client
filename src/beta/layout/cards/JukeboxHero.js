import React from 'react';
import Jukebox from 'beta/devices/Player/Jukebox'

const JukeboxHero = props => {
    
    return (
        <Jukebox endpointId="jukebox" url="https://jukebox.dayton.tech" />
    );
}

export default JukeboxHero;

