import React, { useContext } from 'react';
import { LayoutContext } from './layout/NewLayoutProvider';
import { DataContext } from './DataContext/DataProvider';
import { UserContext } from './user/UserProvider';

import GridSection from './GridSection';
import PlayerBase from "./player/PlayerBase";


export default function PlayersLayout(props) {
    const { goBack } = useContext(LayoutContext);
    const { chooseUserPlayer } = useContext(UserContext);
    const { deviceStatesByCategory } = useContext(DataContext);
    const speakers = deviceStatesByCategory('SPEAKER')

    function changePlayerHome(newplayer) {
        //setUserPlayer(newplayer)
        console.log('setting player to ',newplayer)
        chooseUserPlayer(newplayer)
        goBack()
    }
    
    console.log('speakers',speakers)

    return (    
        <React.Fragment>
            <GridSection name={"Player Groups"}>
            { speakers.map((device) =>
                device.friendlyName===device.InputController.input.value || device.InputController.input.value==='' ? 
                <PlayerBase key={device.endpointId} player={device} setUserPlayer={changePlayerHome} devices={speakers} device={ device } />
                : null
            )}
            </GridSection>
        </React.Fragment>
    )
};
