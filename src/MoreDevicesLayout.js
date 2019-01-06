import React from 'react';
import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { withData } from './DataContext/withData';

import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';

import IconButton from '@material-ui/core/IconButton';

import List from '@material-ui/core/List';

import VirtualList from './virtuallist';
import ComputerList from './computerList';
import ModeList from './modeList';
import DeviceList from './DeviceList';

import SmartButton from './devices/smartbutton';
import GridBreak from './GridBreak';

const useStyles = makeStyles({
        
    list: {
        minWidth: 320,
    },
    content: {
        minWidth: 0,
        padding: "0 !important",
        flexGrow:1,
        display: "flex",
        alignItems: "center"
    },
    thermostatList: {
        width: "100%",
    },

    listItem: {
        padding: "16 0",
        width: '100%',
    },

});


function MoreDevicesLayout(props) {
    
    const classes = useStyles();

    return (
        <React.Fragment>
            <VirtualList sendAlexaCommand={props.sendAlexaCommand} />
            <GridBreak label={"Other Devices"} />
            <DeviceList devices={ props.devicesByCategory('DEVICE') } deviceProperties={ props.propertiesFromDevices(props.devicesByCategory('DEVICE')) } sendAlexaCommand={props.sendAlexaCommand} />

            <GridBreak label={"Computers"} />
            <ComputerList devices={ props.devicesByCategory('PC') } deviceProperties={ props.propertiesFromDevices(props.devicesByCategory('PC')) } sendAlexaCommand={props.sendAlexaCommand} />

            <GridBreak label={"Modes"} />

            <ModeList devices={ props.devicesByCategory('MODE') } deviceProperties={ props.propertiesFromDevices(props.devicesByCategory('MODE')) } sendAlexaCommand={props.sendAlexaCommand} />

        </React.Fragment>
    )

}

export default withData(MoreDevicesLayout);