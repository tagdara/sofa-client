import React from 'react';
import PlayerVolume from './PlayerVolume';

export default function PlayerLinks(props) {

    return (
        <>
            { props.links.map( linkedPlayer => (
                <PlayerVolume key={ linkedPlayer } endpointId={linkedPlayer} />
            ))}
        </>
    );
}
