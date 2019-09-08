import React, { useContext } from 'react';
import { LayoutContext } from './layout/NewLayoutProvider';
import { DataContext } from './DataContext/DataProvider';
import { makeStyles } from '@material-ui/styles';

import Button from '@material-ui/core/Button';
import GridItem from './GridItem';

import QueueMusicIcon from '@material-ui/icons/QueueMusic';
import SpeakerGroupIcon from '@material-ui/icons/SpeakerGroup';
import TvIcon from '@material-ui/icons/Tv';

const useStyles = makeStyles({
        
    summaryButton: {
        width: 96,
    }
});

export default function AvSummary(props) {
    
    const classes = useStyles();
    const { applyHomePage } = useContext(LayoutContext);
    const { devicesByCategory } = useContext(DataContext);

    function onTvs() {
        var devs=devicesByCategory('TV')
        var ondevs=0
        for (var i = 0; i < devs.length; i++) {
            if (devs[i].PowerController.powerState.value==='ON') {
                ondevs+=1
            }
        }
        return ondevs
    }

    function onReceivers() {
        var devs=devicesByCategory('RECEIVER')
        var ondevs=0
        for (var i = 0; i < devs.length; i++) {
            if (devs[i].PowerController.powerState.value==='ON') {
                ondevs+=1
            }
        }
        return ondevs
    }
    
    function onSpeakers() {
        var devs=devicesByCategory('SPEAKER')
        var ondevs=0
        for (var i = 0; i < devs.length; i++) {
            if (devs[i].MusicController.playbackState.value==='PLAYING') {
                ondevs+=1
            }
        }
        return ondevs
    }
    
    return (
        <>
        <GridItem wide={false} nopaper={true}>
            <Button className={classes.summaryButton} variant="outlined" color={onSpeakers() ? "primary" : "default"} onClick={ () => applyHomePage('Audio Video') }>
                <QueueMusicIcon />
            </Button>
        </GridItem>

        <GridItem wide={false} nopaper={true}>
            <Button className={classes.summaryButton} variant="outlined" color={onReceivers() ? "primary" : "default"} onClick={ () => applyHomePage('Audio Video') }>
                <SpeakerGroupIcon />
            </Button>
        </GridItem>

        <GridItem wide={false} nopaper={true}>
            <Button className={classes.summaryButton} variant="outlined" color={onTvs() ? "primary" : "default"} onClick={ () => applyHomePage('Audio Video') }>
                <TvIcon />
            </Button>
        </GridItem>
        </>

    );
}
