import React from 'react';
import Player from 'devices/Player/Player'

const JukeboxPlayer = props => {

    function openJukebox() {
        var newurl="https://jukebox.dayton.tech"
        var safariWindow = window.open();
        safariWindow.location.href = newurl
    }

    return (
        <Player 
            artClick={openJukebox}
            endpointId={props.endpointId}
            buttons={props.buttons}
            onClick={props.onClick}
        />
    );
}

export default JukeboxPlayer;
