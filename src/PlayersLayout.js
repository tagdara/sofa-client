import React, { useContext } from 'react';
import { LayoutContext } from './layout/NewLayoutProvider';
import { DataContext } from './DataContext/DataProvider';

import GridBreak from './GridBreak';
import PlayerBase from "./player/PlayerBase";


export default function PlayersLayout(props) {
    const { applyLayout } = useContext(LayoutContext);
    const { setUserPlayer, devicesByCategory } = useContext(DataContext);
    const speakers = devicesByCategory('SPEAKER')

    function changePlayerHome(newplayer) {
        setUserPlayer(newplayer)
        applyLayout('Home')
    }
    
    console.log('speakers',speakers)

    return (    
        <React.Fragment>
            <GridBreak label={"Players"} />

            { speakers.map((device) =>
                device.friendlyName===device.InputController.input.value || device.InputController.input.value==='' ? 
                <PlayerBase key={device.endpointId} player={device} setUserPlayer={changePlayerHome} devices={speakers} device={ device } />
                : null
            )}
        </React.Fragment>
    )
};
