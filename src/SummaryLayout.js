import React from 'react';
import { useEffect, useContext, useRef } from 'react';
import { LayoutContext } from './layout/NewLayoutProvider';

import GridSection from './GridSection';
import GridItem from './GridItem';

import ErrorBoundary from './ErrorBoundary';

import MusicVideoIcon from '@material-ui/icons/MusicVideo';
import LightbulbOutlineIcon from './LightbulbOutline';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';

import ToggleAvatar from './ToggleAvatar'

import AvSummary from './AvSummary'
import LightSummary from './LightSummary'
import ThermostatSummary from './ThermostatSummary'
import DeviceSummary from './DeviceSummary'
import SecuritySummary from './SecuritySummary'
import CameraSummary from './CameraSummary'
import AlertSummary from './AlertSummary'

export default function SummaryLayout(props) {

    const { setMasterButtonState, applyHomePage} = useRef(useContext(LayoutContext)).current;

    useEffect(() => {
        setMasterButtonState('System')
    },[setMasterButtonState]);    
    
    return (    
        <GridSection name={"Summary"} >
            <GridItem>
                <ListItem onClick={() => applyHomePage('Audio Video') }>
                    <ToggleAvatar avatarState="on">
                        <MusicVideoIcon />
                    </ToggleAvatar>
                    <ListItemText primary="Audio Video" secondary={'Control Music and TV'} />
                </ListItem>
                <ListItem>
                    <ErrorBoundary>
                        <AvSummary />
                    </ErrorBoundary>
                </ListItem>
            </GridItem>
            <GridItem>
                <ListItem onClick={() => applyHomePage('Lights and Comfort')}>
                    <ToggleAvatar avatarState="on">
                        <LightbulbOutlineIcon />
                    </ToggleAvatar>
                    <ListItemText primary="Lights and Comfort" secondary={'Lighting, Temperature and other devices'} />
                </ListItem>
                <ListItem>
                    <ErrorBoundary>
                        <LightSummary />
                        <DeviceSummary />
                        <ThermostatSummary />
                    </ErrorBoundary>
                </ListItem>
            </GridItem>
            <GridItem>
                <ListItem onClick={() =>  applyHomePage('Security')}>
                    <ToggleAvatar avatarState="on">
                        <VerifiedUserIcon />
                    </ToggleAvatar>
                    <ListItemText primary="Security" secondary={'Cameras, Locks and Sensors'} />
                </ListItem>
                <ListItem>
                    <ErrorBoundary>
                        <SecuritySummary />
                        <AlertSummary />
                        <CameraSummary />
                    </ErrorBoundary>
                </ListItem>

            </GridItem>
            <Typography variant="caption">v2.05</Typography>
        </GridSection>
    )
};