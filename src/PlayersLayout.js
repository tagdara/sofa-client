import React from 'react';
import { useState, useEffect } from 'react';
import { withData } from './DataContext/withData';
import { withLayout } from './layout/NewLayoutProvider';
import { withUser } from './user/UserProvider';

import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

import GridBreak from './GridBreak';
import Sonos from "./sonos/Sonos";


function PlayersLayout(props) {

    const speakers = props.devicesByCategory('SPEAKER')

    function changePlayerHome(newplayer) {
        var newplayerobj=props.deviceByEndpointId(newplayer)
        props.setUserPlayer(newplayerobj)
        props.applyLayout('Home')
    }

    return (    
        <React.Fragment>
            <GridBreak label={"Players"} />

            { speakers.map((device) =>
                device.endpointId===device.InputController.input.value || device.InputController.input.value=='' ? 
                <Sonos key={device.endpointId} player={device} changePlayer={changePlayerHome} devices={speakers} device={ device } />
                : null
            )}
        </React.Fragment>
    )
};

export default withUser(withData(withLayout(PlayersLayout)));