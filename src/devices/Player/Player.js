import React from 'react';
import PlayerArtOverlay from 'devices/Player/PlayerArtOverlay';
import PlayerButtons from 'devices/Player/PlayerButtons';
import PlaceholderCard from 'layout/PlaceholderCard';
import { directive } from 'endpoint-model/directive/directive'
import usePlaybackState from 'endpoint-model/property/playbackState/usePlaybackState'

const PlayerHeader = props => {
    
    const jukebox = 'jukebox'
    const { playbackState } = usePlaybackState(props.endpointId)

    if (!playbackState) {
        return <PlaceholderCard count={ 3 } />
    }

    function handlePlayPause(event) {
        event.stopPropagation();
        if (playbackState ==='PLAYING') {
            directive(jukebox, 'Sofa.MusicController', 'Pause')
        } else {
            directive(jukebox, 'Sofa.MusicController', 'Play')
        }
    }; 

    function handleSkip(event) {
        event.stopPropagation();
        directive(jukebox, 'Sofa.MusicController', "Skip")
    }; 

    function handleStop(event) {
        event.stopPropagation();
        directive(jukebox, 'Sofa.MusicController', "Stop")
    }; 

    return (
        <PlayerArtOverlay   
            endpointId={props.endpointId}
            onClick={props.showOverlay} 
            setMini={props.toggleIdle}
        >
            <PlayerArtOverlayButtons    
                showOverlay={props.showOverlay}
                min={props.setMini} 
                cover={props.toggleIdle} 
                stop={handleStop} 
                url={props.url}
                playPause={handlePlayPause}
                skip={handleSkip}
                jukebox={true} 
                toggleSpeakerFilter={ props.toggleSpeakers }
                playbackState={ playbackState } />
        </PlayerArtOverlay>
    );
}

export default PlayerHeader;

