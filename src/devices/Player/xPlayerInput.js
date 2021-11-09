
import React, { useState, useEffect, useContext } from 'react';
import { DeviceStateContext } from 'context/DeviceStateContext';
import ListItem from '@mui/material/ListItem';
import Button from '@mui/material/Button';
import GridItem from 'components/GridItem';


export default function PlayerInput(props) {

    const { deviceState, getEndpointIdsByFriendlyName, unregisterDevices } = useContext(DeviceStateContext);
    const [mca, setMca]=useState(undefined)

    useEffect(() => {
        setMca(getEndpointIdsByFriendlyName('Living Room Speakers', 'PlayerInput')[0])
        return function cleanup() {
            unregisterDevices('PlayerInput');
        };
    // eslint-disable-next-line 
    }, [] )
    
    function currentInput() {
        try {
            console.log('mca', deviceState(mca))
            return deviceState(mca).InputController.input
        } 
        catch {
            return "0"
        }
    }


    function handleInput(event, inputname) {
        props.directive(mca, "InputController", 'SelectInput', { "input": inputname } )
    }; 

    return (
        <GridItem >
            <ListItem>
                <Button color={ currentInput() === "1" ? "primary" : "secondary"} onClick={ () => handleInput("click", "2") }>Airplay</Button>
                <Button color={ currentInput() === "0" ? "primary" : "secondary"} onClick={ () => handleInput("click", "1") }>Jukebox</Button>
            </ListItem>
        </GridItem>
    );

}

