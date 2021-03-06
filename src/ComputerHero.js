import React, { useState, useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/styles';

import { LayoutContext } from './layout/NewLayoutProvider';
import { DataContext } from './DataContext/DataProvider';

import ListItem from '@material-ui/core/ListItem';
import DesktopWindowsIcon from '@material-ui/icons/DesktopWindows';
import CardBase from './CardBase';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import PlaceholderCard from './PlaceholderCard';
import SofaListItem from './SofaListItem';

const useStyles = makeStyles(theme => {
    
    return {    
        select: {
            minWidth: "30%",
        },
        button: {
            backgroundColor: theme.palette.background.button,
            borderColor: "rgba(255,255,255, 0) !important",
            marginRight: 1,
            padding: "3px 8px",
            "&:hover" : {
                backgroundColor: theme.palette.background.hoverButton
            },
        },
        onButton: {
            backgroundColor: theme.palette.background.selectButton,
            borderColor: "rgba(255,255,255, 0) !important",
            marginRight: 1,
            padding: "3px 8px",
            "&:hover" : {
                backgroundColor: theme.palette.background.hoverSelectButton
            },
 
        },
        partButton: {
            backgroundColor: theme.palette.background.mediumButton,
            borderColor: "rgba(255,255,255, 0) !important",
            marginRight: 1,
            padding: "3px 8px",
            "&:hover" : {
                backgroundColor: theme.palette.background.hoverButton
            },

 
        },
 
 
        buttonGroup: {
            paddingRight: 8,
        }

    }

});

export default function ComputerHero(props) {
    
    const classes = useStyles();
    const { selectPage } = useContext(LayoutContext);
    const { cardReady, unregisterDevices, getEndpointIdsByFriendlyName, getEndpointIdsByCategory, devices, deviceStates, directive } = useContext(DataContext);
    const [switches, setSwitches]=useState([])
    const matrixDeviceNames=['Living Room TV', 'Office 1', 'Office 2', 'Office 3', 'Office 4', 'Downstairs 1', 'Downstairs 2', 'Rack']
    const [matrixDevices, setMatrixDevices]=useState([])
    const matrixDefaults={ 'Office 1':'PC1', 'Office 2':'PC2', 'Office 3':'PC3', 'Office 4':'PC4', 'Downstairs 1':'PC1', 'Downstairs 2':'PC2' }
    
    // This stuff really needs to be moved to config and autodetect, maybe solve with virtual device combining PC and plug
    const computerPlugs=["PC1 outlet", "PC2 outlet", "PC3 outlet", "PC4 outlet"]

    useEffect(() => {

        var switchesEndpointIds=getEndpointIdsByCategory('SMARTPLUG', 'ComputerHero')
        var matrixEndpointIds=getEndpointIdsByFriendlyName(matrixDeviceNames, 'ComputerHero', false)
        setSwitches(switchesEndpointIds)
        setMatrixDevices(matrixEndpointIds)
        return function cleanup() {
            unregisterDevices('ComputerHero');
        };
    // eslint-disable-next-line     
    }, [])



    function onCount() {
        var ondevs=0
        for (var i = 0; i < switches.length; i++) {
            if (computerPlugs.includes(devices[switches[i]].friendlyName)) {
                if (deviceStates[switches[i]].PowerController.powerState.value==='ON') {
                    if (deviceStates[switches[i]].hasOwnProperty('Energy Level')) {
                        if (deviceStates[switches[i]]["Energy Level"].mode.value!=="Standby") {
                            ondevs+=1
                        }
                    }
                }
            }
        }
        return ondevs
    }

    function toggleInput(devicename) {
        for (var i = 0; i < matrixDevices.length; i++) {
            if (devices[matrixDevices[i]].friendlyName===devicename) {
                if (deviceStates[matrixDevices[i]].InputController.input.value===matrixDefaults[devicename]) {
                    directive(matrixDevices[i], "InputController", 'SelectInput', { "input": 'Blank' } )
                    return true
                } else {
                    directive(matrixDevices[i], "InputController", 'SelectInput', { "input": matrixDefaults[devicename] } )
                    return true
                }
            }
        }
    }; 
    
    function isDefault(devicename) {
        for (var i = 0; i < matrixDevices.length; i++) {
            if (devices[matrixDevices[i]].friendlyName===devicename) {
                if (deviceStates[matrixDevices[i]].InputController.input.value===matrixDefaults[devicename]) {
                    return true
                }
            }
        }
    
    return false
    }
    
    function computerMatrixState(matrixPort) {
        if (isDefault(matrixPort)) {
            for (var i = 0; i < switches.length; i++) {
                if (matrixDefaults[matrixPort]+" outlet" === devices[switches[i]].friendlyName) {
                    if (deviceStates[switches[i]].PowerController.powerState.value==='ON') {
                        if (deviceStates[switches[i]].hasOwnProperty('Energy Level')) {
                            if (deviceStates[switches[i]]["Energy Level"].mode.value!=="Standby") {
                                return classes.onButton
                            }
                        }
                    } 
                    return classes.partButton
                }
            }
        }
        return classes.button
    }
    
    function countLabel() {
        try {
            if (onCount()>0) {
                return onCount()+" computers on"
            }
            return "All computers off"
            
        }
        catch {}
        return "Computers"
    }
    
    if (!cardReady('ComputerHero')) {
        return <PlaceholderCard count={2 } />
    }
    
    return (
        <CardBase >
            <SofaListItem   avatar={<DesktopWindowsIcon />} onClick={ () => selectPage('ComputerLayout') } avatarState={ onCount() ? 'on' : 'off'}
                            primary={ countLabel() }  />
            <ListItem>
                <ButtonGroup className={classes.buttonGroup} size="small" variant="text"  >
                    <Button className={computerMatrixState('Office 1') } onClick={ () => toggleInput('Office 1','PC1') }>1</Button>
                    <Button className={computerMatrixState('Office 2') } onClick={ () => toggleInput('Office 2','PC2') }>2</Button>
                    <Button className={computerMatrixState('Office 3') } onClick={ () => toggleInput('Office 3','PC3') }>3</Button>
                    <Button className={computerMatrixState('Office 4') } onClick={ () => toggleInput('Office 4','PC4') }>4</Button>
                </ButtonGroup>
                <ButtonGroup className={classes.buttonGroup} size="small" variant="text"  >
                    <Button className={computerMatrixState('Downstairs 1') } onClick={ () => toggleInput('Downstairs 1','PC1') }>D1</Button>
                    <Button className={computerMatrixState('Downstairs 2') } onClick={ () => toggleInput('Downstairs 2','PC2') }>D2</Button>
                </ButtonGroup>
            </ListItem>
        </CardBase>
    );
}
