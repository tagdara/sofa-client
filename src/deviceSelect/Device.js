import React, { memo } from 'react';
import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { withData } from '../DataContext/withData';
import { withLayout } from '../layout/NewLayoutProvider';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import Button from '@material-ui/core/Button';

import GridItem from '../GridItem';

import DataUsageIcon from '@material-ui/icons/DataUsage';
import DeveloperBoardIcon from '@material-ui/icons/DeveloperBoard';
import SpeakerIcon from '@material-ui/icons/Speaker';
import SpeakerGroupIcon from '@material-ui/icons/SpeakerGroup';
import TouchAppIcon from '@material-ui/icons/TouchApp';
import TuneIcon from '@material-ui/icons/Tune';
import ListIcon from '@material-ui/icons/List';
import TvIcon from '@material-ui/icons/Tv';
import LightbulbOutlineIcon from '../LightbulbOutline';

const useStyles = makeStyles({
        
    deviceExpand: {
        padding: "0",
        marginBottom: 2,
    },
    detailList: {
        paddingLeft: 24,
    },
    expListItem: {
        padding: 0,
        width: '100%',
    },
    list: {
        minWidth: 320,
        width: "100%",
    },
    summary: {
        margin: '0 !important',
        padding: 0,
    },
    sumexp: {
        margin: '0 !important',
        padding: 0,
    },
});

export default function Device(props) {

    const classes = useStyles();
    const icons = {'SCENE_TRIGGER':TuneIcon, 'ACTIVITY_TRIGGER':ListIcon, 'LIGHT':LightbulbOutlineIcon, 'BUTTON':TouchAppIcon, 'SPEAKER':SpeakerIcon, 'THERMOSTAT':DataUsageIcon, 'RECEIVER':SpeakerGroupIcon, 'TV':TvIcon}

    function getIcon(category, size='default') {
            
        var pxSize=24;
        if (size=='small') {
            pxSize=16
        }
        if (icons.hasOwnProperty(category)) {
            var RealIcon=icons[category]
        } else {
            var RealIcon=DeveloperBoardIcon
        }
        
        return <RealIcon size={pxSize} fontSize={size} />
    }

    return (
        <GridItem nopad={true}>
            <ListItem button onClick={() => props.select(props.device.endpointId)}>
                <ListItemIcon>{getIcon(props.device.displayCategories)}</ListItemIcon>
                <ListItemText primary={props.device.friendlyName} secondary={props.device.displayCategories} />
            </ListItem>
        </GridItem>
    )
}

