import React, { useContext } from 'react';
import { DataContext } from './DataContext/DataProvider';
import { makeStyles, withTheme } from '@material-ui/styles';

import IconButton from '@material-ui/core/IconButton';

import QueueMusicIcon from '@material-ui/icons/QueueMusic';
import SpeakerGroupIcon from '@material-ui/icons/SpeakerGroup';
import TvIcon from '@material-ui/icons/Tv';

const useStyles = makeStyles(theme => {
    return {   
        iconRow: {
            padding: 16,
            display: "flex",
            justifyContent: "space-between",
            overflow: "hidden",
            flexWrap: "nowrap",
        },
        summaryButton: {
            width: 36,
            height: 36,
            padding: 8,
            color: theme.palette.primary.contrastText,
        },
        icon: {
            fontSize: 18,
            marginRight: 0,
        },
    }
});

export function AvSummary(props) {
    
    const classes = useStyles();
    const { deviceStatesByCategory } = useContext(DataContext);

    function onTvs() {
        var devs=deviceStatesByCategory('TV')
        var ondevs=0
        for (var i = 0; i < devs.length; i++) {
            if (devs[i].PowerController.powerState.value==='ON') {
                ondevs+=1
            }
        }
        return ondevs
    }

    function onReceivers() {
        var devs=deviceStatesByCategory('RECEIVER')
        var ondevs=0
        for (var i = 0; i < devs.length; i++) {
            if (devs[i].PowerController.powerState.value==='ON') {
                ondevs+=1
            }
        }
        return ondevs
    }
    
    function onSpeakers() {
        var devs=deviceStatesByCategory('SPEAKER')
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
            <div className={classes.iconRow}>
            <IconButton size={"small"} className={classes.summaryButton}
                style={{'backgroundColor': props.theme.palette.avatar[onSpeakers() ? 'on' : 'off']}}>
                <QueueMusicIcon className={classes.icon} />
            </IconButton>

            <IconButton size={"small"} className={classes.summaryButton}
                style={{'backgroundColor': props.theme.palette.avatar[onReceivers() ? 'on' : 'off']}}>
                <SpeakerGroupIcon className={classes.icon} />
            </IconButton>

            <IconButton size={"small"} className={classes.summaryButton}
                style={{'backgroundColor': props.theme.palette.avatar[onTvs() ? 'on' : 'off']}}>       
                <TvIcon  className={classes.icon} />
            </IconButton>
            </div>
        </>

    );
}

export default withTheme(AvSummary)
