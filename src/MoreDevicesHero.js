import React, { useState, useContext } from 'react';
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
import DeviceList from './other/DeviceList';
import FanIcon from '@material-ui/icons/Toys';

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
    const { deviceStatesByFriendlyName, directive } = useContext(DataContext);
    const switches=deviceStatesByFriendlyName(['Bathroom Fan','Bathroom Heat Fan'], false, 'SWITCH')
    const [ showDetail, setShowDetail] = useState(props.showDetail)
    

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
                        { switches &&
                            <DeviceList nested={true} icon={<FanIcon />} devices={ switches } directive={directive} />
                        }
                    </>
                }
            </List>
            
        </GridItem>
    );
}

MoreDevicesHero.defaultProps = {
    showDetail: false,
}
