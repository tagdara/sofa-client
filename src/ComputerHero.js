import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/styles';

import { LayoutContext } from './layout/NewLayoutProvider';
import { DataContext } from './DataContext/DataProvider';

import ToggleAvatar from './ToggleAvatar';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import DevicesOtherIcon from '@material-ui/icons/DevicesOther';
import GridItem from './GridItem';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

const useStyles = makeStyles(theme => {
    
    return {    
        select: {
            minWidth: "30%",
        },
        button: {
            backgroundColor: theme.palette.background.button,
            borderColor: "rgba(255,255,255, 0) !important",
            marginRight: 1,
            padding: "3px 8px"
        },
        onButton: {
            backgroundColor: theme.palette.background.selectButton,
            borderColor: "rgba(255,255,255, 0) !important",
            marginRight: 1,
            padding: "3px 8px"
        },
        buttonGroup: {
            paddingRight: 8,
        }

    }

});

export default function ComputerHero(props) {
    
    const classes = useStyles();
    const { applyLayoutCard } = useContext(LayoutContext);
    const { directive, deviceStatesByFriendlyName, deviceStatesByCategory } = useContext(DataContext);
    const switches = devsWithPowerState(deviceStatesByCategory('SWITCH'))
    const matrixDevices=deviceStatesByFriendlyName(['Living Room TV', 'Office 1', 'Office 2', 'Office 3', 'Office 4', 'Downstairs 1', 'Downstairs 2', 'Rack'], false)
    const matrixDefaults={ 'Office 1':'PC1', 'Office 2':'PC2', 'Office 3':'PC3', 'Office 4':'PC4', 'Downstairs 1':'PC1', 'Downstairs 2':'PC2' }

    function devsWithPowerState(devs) {
        var outdevs=[]
        for (var j = 0; j < devs.length; j++) {
            if (devs[j].hasOwnProperty('PowerController')) {
                outdevs.push(devs[j])
            }
        }
        return outdevs
    }

    function onCount() {
        var ondevs=0
        for (var i = 0; i < switches.length; i++) {
            if (switches[i].PowerController.powerState.value==='ON') {
                ondevs+=1
            }
        }
        return ondevs
    }

    function toggleInput(devicename) {
        for (var i = 0; i < matrixDevices.length; i++) {
            if (matrixDevices[i].friendlyName===devicename) {
                if (matrixDevices[i].InputController.input.value===matrixDefaults[devicename]) {
                    directive(matrixDevices[i].endpointId, "InputController", 'SelectInput', { "input": 'Blank' } )
                    return true
                } else {
                    directive(matrixDevices[i].endpointId, "InputController", 'SelectInput', { "input": matrixDefaults[devicename] } )
                    return true
                }
            }
        }
    }; 
    
    function isDefault(devicename) {
        for (var i = 0; i < matrixDevices.length; i++) {
            if (matrixDevices[i].friendlyName===devicename) {
                if (matrixDevices[i].InputController.input.value===matrixDefaults[devicename]) {
                    return true
                }
            }
        }
    
    return false
    }
    

    return (
        <GridItem wide={props.wide} noPad={true} nolist={true} >
            <ListItem>
                <ToggleAvatar onClick={ () => applyLayoutCard('ComputerLayout') } noback={true} avatarState={ onCount() ? 'on' : 'off'}><DevicesOtherIcon /></ToggleAvatar>
                <ListItemText onClick={ () => applyLayoutCard('ComputerLayout') } primary={"Computers"} secondary={onCount() ? onCount()+" devices on" : null} />
            </ListItem>
            <ListItem>
                <ButtonGroup className={classes.buttonGroup} size="small" variant="text"  >
                    <Button className={isDefault('Office 1') ? classes.onButton : classes.button} onClick={ () => toggleInput('Office 1','PC1') }>1</Button>
                    <Button className={isDefault('Office 2') ? classes.onButton : classes.button} onClick={ () => toggleInput('Office 2','PC2') }>2</Button>
                    <Button className={isDefault('Office 3') ? classes.onButton : classes.button} onClick={ () => toggleInput('Office 3','PC3') }>3</Button>
                    <Button className={isDefault('Office 4') ? classes.onButton : classes.button} onClick={ () => toggleInput('Office 4','PC4') }>4</Button>
                </ButtonGroup>
                <ButtonGroup className={classes.buttonGroup} size="small" variant="text"  >
                    <Button className={isDefault('Downstairs 1') ? classes.onButton : classes.button} onClick={ () => toggleInput('Downstairs 1','PC1') }>D1</Button>
                    <Button className={isDefault('Downstairs 2') ? classes.onButton : classes.button} onClick={ () => toggleInput('Downstairs 2','PC2') }>D2</Button>
                </ButtonGroup>
            </ListItem>
        </GridItem>
    );
}
