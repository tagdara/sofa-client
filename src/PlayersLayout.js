import React, { useContext } from 'react';
import { LayoutContext } from './layout/NewLayoutProvider';
import { DataContext } from './DataContext/DataProvider';

import GridBreak from './GridBreak';
import Sonos from "./sonos/Sonos";


export default function PlayersLayout(props) {
    const { applyLayout } = useContext(LayoutContext);
    const { devicesByCategory } = useContext(DataContext);
    const speakers = devicesByCategory('SPEAKER')

    function changePlayerHome(newplayer) {
        //var newplayerobj=deviceByEndpointId(newplayer)
        applyLayout('Home')
    }

    return (    
        <React.Fragment>
            <GridBreak label={"Players"} />

            { speakers.map((device) =>
                device.endpointId===device.InputController.input.value || device.InputController.input.value==='' ? 
                <Sonos key={device.endpointId} player={device} changePlayer={changePlayerHome} devices={speakers} device={ device } />
                : null
            )}
        </React.Fragment>
    )
};
