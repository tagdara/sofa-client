import React, { useContext } from 'react';
import { LayoutContext } from './layout/NewLayoutProvider';
import { DataContext } from './DataContext/DataProvider';

import ToggleAvatar from './ToggleAvatar';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import DevicesOtherIcon from '@material-ui/icons/DevicesOther';

import GridItem from './GridItem';

export default function ComputerHero(props) {
    
    const { applyLayoutCard } = useContext(LayoutContext);
    const { deviceStatesByCategory } = useContext(DataContext);
    const switches = devsWithPowerState(deviceStatesByCategory('SWITCH'))
    
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

    return (
        <GridItem wide={props.wide} noPad={true} nolist={true} >
            <ListItem onClick={ () => applyLayoutCard('ComputerLayout') } >
                <ToggleAvatar noback={true} avatarState={ onCount() ? 'on' : 'off'}><DevicesOtherIcon /></ToggleAvatar>
                <ListItemText primary={"Computers"} secondary={onCount() ? onCount()+" devices on" : null} />
            </ListItem>
        </GridItem>
    );
}
