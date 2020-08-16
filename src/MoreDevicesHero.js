import React, { useState, useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/styles';
import { LayoutContext } from './layout/NewLayoutProvider';
import { DataContext } from './DataContext/DataProvider';

import ToggleAvatar from './ToggleAvatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import DevicesOtherIcon from '@material-ui/icons/DevicesOther';

import GridItem from './GridItem';
import VirtualList from './other/VirtualList';
import FanIcon from '@material-ui/icons/Toys';
import Device from './other/Device';

const useStyles = makeStyles(theme => {
    
    return {    
        cardline: {
            padding: "8px 16px 8px 16px",
            display: "flex",
        },
        list: {
            maxWidth: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
        },
        minLI: {
            minHeight: 48,
            display: "flex",
            alignItems: "center",
            flexDirection: "row",
        },
    }

});

export default function MoreDevicesHero(props) {
    
    const classes = useStyles();
    const { applyLayoutCard } = useContext(LayoutContext);
    const { cardReady, devices, deviceStates, getEndpointIdsByFriendlyName, unregisterDevices, directive } = useContext(DataContext);
    const switchNames=['Bathroom Fan','Bathroom Heat Fan']
    const [switches, setSwitches]=useState([])
    const [ showDetail, setShowDetail] = useState(props.showDetail)

    useEffect(() => {
        setSwitches(getEndpointIdsByFriendlyName(switchNames, 'MoreDevicesHero', true))
        return function cleanup() {
            unregisterDevices('MoreDevicesHero');
        };
    // eslint-disable-next-line 
    }, [ ] )

    

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
        cardReady('MoreDevicesHero') ?
        <GridItem wide={props.wide} nopad={true} >
            <List className={classes.list} >
                { !showDetail ?
                <ListItem className={ classes.cardline } onClick={ () => setShowDetail(!showDetail) } >
                    <ToggleAvatar  onClick={ () => applyLayoutCard('MoreDevicesLayout') } noback={true} avatarState={ onCount() ? 'on' : 'off'}><DevicesOtherIcon /></ToggleAvatar>
                    <ListItemText primary={"More Devices"} secondary={onCount() ? onCount()+" devices on" : null} className={onCount() ? classes.normal : classes.minLI} />
                </ListItem>
                :
                    <>
                        <VirtualList directive={directive} nested={true} />
                        { switches.map(switchId =>
                            <Device nested={true} icon={<FanIcon />} key={ switchId } device={ devices[switchId] } deviceState={deviceStates[switchId]} directive={directive} />
                        )}
                    </>
                }
            </List>
            
        </GridItem>
        : 
        null
    );
}

MoreDevicesHero.defaultProps = {
    showDetail: false,
}
