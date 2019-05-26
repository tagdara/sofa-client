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
        props.setUserPlayer(newplayer)
        props.applyLayout('Home')
    }

    return (    
        <React.Fragment>
            <GridBreak label={"Players"} />

            { speakers.map((device) =>
                device.endpointId===props.deviceProperties[device.endpointId].input || props.deviceProperties[device.endpointId].input=='' ? 
                <Sonos key={device.endpointId} player={device} changePlayer={changePlayerHome} sendAlexaCommand={props.sendAlexaCommand} devices={speakers} name={ device.friendlyName } device={ device } deviceProperties={ props.deviceProperties[device.endpointId] } linkedPlayers={ props.deviceProperties }/>
                : null
            )}
        </React.Fragment>
    )
};

export default withUser(withData(withLayout(PlayersLayout)));