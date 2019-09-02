import React from 'react';
import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { withData } from './DataContext/withData';
import { withLayout } from './layout/NewLayoutProvider';

import Button from '@material-ui/core/Button';
import GridItem from './GridItem';
import DevicesOtherIcon from '@material-ui/icons/DevicesOther';
import QueueMusicIcon from '@material-ui/icons/QueueMusic';
import SpeakerGroupIcon from '@material-ui/icons/SpeakerGroup';
import TvIcon from '@material-ui/icons/Tv';

const useStyles = makeStyles({
        
    topSplit: {
        paddingBottom: 24,
    },
    summaryButton: {
        width: 96,
    }
});

function AvSummary(props) {
    
    const classes = useStyles();
    const [speakerCount, setSpeakerCount] = useState(0)
    const [receiverCount, setReceiverCount] = useState(0)
    const [tvCount, setTvCount] = useState(0)

    useEffect(() => {
        var devs=props.devicesByCategory('SPEAKER')
        var ondevs=0
        for (var i = 0; i < devs.length; i++) {
            if (devs[i].MusicController.playbackState.value=='PLAYING') {
                ondevs+=1
            }
        }
        setSpeakerCount(ondevs)

        var devs=props.devicesByCategory('RECEIVER')
        var ondevs=0
        for (var i = 0; i < devs.length; i++) {
            if (devs[i].PowerController.powerState.value=='ON') {
                ondevs+=1
            }
        }
        setReceiverCount(ondevs)

        var devs=props.devicesByCategory('TV')
        var ondevs=0
        for (var i = 0; i < devs.length; i++) {
            if (devs[i].PowerController.powerState.value=='ON') {
                ondevs+=1
            }
        }
        setTvCount(ondevs)

    }, [props.devices])
    
    return (
        <>
        <GridItem wide={false} nopaper={true}>
            <Button className={classes.summaryButton} variant="outlined" color={speakerCount ? "primary" : "default"} onClick={ () => props.applyHomePage('Audio Video') }>
                <QueueMusicIcon />
            </Button>
        </GridItem>

        <GridItem wide={false} nopaper={true}>
            <Button className={classes.summaryButton} variant="outlined" color={receiverCount ? "primary" : "default"} onClick={ () => props.applyHomePage('Audio Video') }>
                <SpeakerGroupIcon />
            </Button>
        </GridItem>

        <GridItem wide={false} nopaper={true}>
            <Button className={classes.summaryButton} variant="outlined" color={tvCount ? "primary" : "default"} onClick={ () => props.applyHomePage('Audio Video') }>
                <TvIcon />
            </Button>
        </GridItem>
        </>

    );
}

export default withData(withLayout(AvSummary));
