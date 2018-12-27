import React from 'react';
import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { withData } from './DataContext/withData';

import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

import GridBreak from './GridBreak';
import Sonos from "./sonos/sonos";

const useStyles = makeStyles({
    
    listDialogContent: {
        padding: 0,
    }

});

function PlayersLayout(props) {

    const classes = useStyles();
    const isMobile = window.innerWidth <= 800;
    const speakers = props.devicesByCategory('SPEAKER')

    function filterByType(zonetype) {
        var typezones=[]
        var allzones=props.devicesByCategory('SPEAKER')
        return allzones
            
    }
    
    function setPlayerHome(player) {
        console.log('Setting player to',player)
        props.setPlayer(player)
        props.setLayout('Home')
    }

    return (    
        <React.Fragment>
            <GridBreak label={"Players"} />

            { speakers.map((device) =>
                device.friendlyName===props.deviceProperties[device.friendlyName].input || props.deviceProperties[device.friendlyName].input=='' ? 
                <Sonos setLayoutCard={props.setLayoutCard} key={device.endpointId} setPlayer={setPlayerHome} sendAlexaCommand={props.sendAlexaCommand} devices={speakers} name={ device.friendlyName } device={ device } deviceProperties={ props.deviceProperties[device.friendlyName] } linkedPlayers={ props.deviceProperties }/>
                : null
            )}
        </React.Fragment>
    )
};

export default withData(PlayersLayout);