import React from 'react';
import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { withThemeChange } from './theme/SofaTheme';
import { withLayout } from './layout/NewLayoutProvider';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

import GridSection from './GridSection';
import GridItem from './GridItem';

import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';

import TuneIcon from '@material-ui/icons/Tune';
import HistoryIcon from '@material-ui/icons/History';
import CompareIcon from '@material-ui/icons/Compare';
import PersonIcon from '@material-ui/icons/Person';
import EditIcon from '@material-ui/icons/Edit';
import MusicVideoIcon from '@material-ui/icons/MusicVideo';
import LightbulbOutlineIcon from './LightbulbOutline';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ToggleAvatar from './ToggleAvatar'

import AvSummary from './AvSummary'


import LightSummary from './LightSummary'
import ThermostatSummary from './ThermostatSummary'
import DeviceSummary from './DeviceSummary'
import SecuritySummary from './SecuritySummary'


const useStyles = makeStyles({
    
    dialogActions: {
        paddingBottom: "env(safe-area-inset-bottom)",
    },
    listDialogContent: {
        padding: 0,
    },
    button: {
        minWidth: 36
    },
    buttonspacer: {
        minWidth: 36,
        marginRight: 18
    },

});

function SummaryLayout(props) {

    const classes = useStyles();

    useEffect(() => {
        props.setMasterButtonState('System')
    },[]);    
    
    return (    
        <GridSection name={"Summary"} >
            <GridItem>
                <ListItem onClick={() => props.applyHomePage('Audio Video') }>
                    <ToggleAvatar avatarState="on">
                        <MusicVideoIcon />
                    </ToggleAvatar>
                    <ListItemText primary="Audio Video" secondary={'Control Music and TV'} />
                </ListItem>
                <ListItem>
                    <AvSummary />
                </ListItem>
            </GridItem>
            <GridItem>
                <ListItem onClick={() =>  props.applyHomePage('Lights and Comfort')}>
                    <ToggleAvatar avatarState="on">
                        <LightbulbOutlineIcon />
                    </ToggleAvatar>
                    <ListItemText primary="Lights and Comfort" secondary={'Lighting, Temperature and other devices'} />
                </ListItem>
                <ListItem>
                    <LightSummary />
                    <DeviceSummary />
                    <ThermostatSummary />
                </ListItem>
            </GridItem>
            <GridItem>
                <ListItem onClick={() =>  props.applyHomePage('Security')}>
                    <ToggleAvatar avatarState="on">
                        <VerifiedUserIcon />
                    </ToggleAvatar>
                    <ListItemText primary="Security" secondary={'Cameras, Locks and Sensors'} />
                </ListItem>
                <ListItem>
                    <SecuritySummary />
                </ListItem>

            </GridItem>
        </GridSection>
    )
};

export default withLayout(withThemeChange(SummaryLayout));