import React from 'react';
import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { withData } from './DataContext/withData';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import List from '@material-ui/core/List';

import FullscreenIcon from '@material-ui/icons/Fullscreen';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import QueueMusicIcon from '@material-ui/icons/QueueMusic';
import StopIcon from '@material-ui/icons/Stop';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import ViewModuleIcon from '@material-ui/icons/ViewModule';

import SonosVolume from './sonos/sonosvolume';
import SonosCover from './sonos/sonosCover';
import SonosFavorites from './sonos/sonosFavorites';
import CoverDimmer from './sonos/CoverDimmer';

const useStyles = makeStyles({

    card: {
        maxWidth: '480px',
        minWidth: '320px',
        flexDirection: "row",
        boxSizing: "border-box",
        justifyContent: "space-between",
        flexGrow: 1,
    },
    dialogContent: {
        padding: 0,
    },
    dialogcard: {
        maxWidth: '480px',
        minWidth: '320px',
        flexDirection: "row",
        justifyContent: "space-between",
    },
    bigcover: {
        width: "100%",
        paddingTop: "100%",
        position: "relative",
    },
    stoppedCover: {
        minHeight: 48,
        display: "flex",
        flexGrow: 1,
        padding: 12,
        alignItems: "center",
    },
 
    playIcon: {
        height: 38,
        width: 38,
    },

    dialogSongTextBox: {
        color: "#fff",
        position: "absolute",
        padding: 16,
        top:0,
        bottom:64,
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
    },
    songTextHolder: {
        margin: "0 auto",
    },

    dialogSongTitle: {
        fontSize:"3rem",
        paddingBottom:16,
        flexBasis: 0,
        flexGrow:2,
        display: "flex",
        overflow: "hidden",
    },
    dialogSongArtist: {
        fontSize:"2.2rem",
        fontWeight:200,
        flexBasis: 0,
        flexGrow:1,
        display: "flex",
        overflow: "hidden",
    },
    dialogPlayButton: {
        position: "absolute",
        bottom: 16,
        right: 48,
    },
    dialogStopButton: {
        position: "absolute",
        bottom: 20,
        right: 96,
    },
    dialogSkipButton: {
        position: "absolute",
        bottom: 20,
        right: 4,
    },
    dialogGridButton: {
        position: "absolute",
        bottom: 20,
        left: 16,
    },
    dialogFavButton: {
        position: "absolute",
        bottom: 20,
        left: 64,
    },
    dialogCoverButton: {
        position: "absolute",
        bottom: 20,
        left: 112,
    },

});

function SonosPlayerCard(props) {
    
    const classes = useStyles();
    const speakers = props.devicesByCategory('SPEAKER')
    const isMobile = window.innerWidth <= 800;
    const [showOverlay, setShowOverlay] = useState(true);
    const [mediaSelect, setMediaSelect] = useState(false);
    const [coverView, setCoverView] = useState(false);
    const coverDefault = '/image/sonos/logo'; 
    const [playerName, setPlayerName] = useState("");
    const [defaultPlayer, setDefaultPlayer] = useState("Office");
    const device = props.deviceByName(playerName)

    useEffect(() => {
        setPlayerName(bestPlayer())
    },[]);


    function getCoordinatorFromPlayer(playername) {
        if (props.deviceProperties.hasOwnProperty(playername)) {
            setPlayerName(props.deviceProperties[playername].input)
        } else {
            setPlayerName(playername)
        }
    }
    
    function bestPlayer() {
        
        if (props.player) {
            return props.player
        } else {
            var hotplayer='';
            for (var s = 0; s < speakers.length; s++) {
                var name=speakers[s].friendlyName
                if (props.deviceProperties.hasOwnProperty(name)) {
                    var dev=props.deviceProperties[name]
                    if (dev.hasOwnProperty("playbackState")) {
                        if (dev.playbackState=='PLAYING') {
                            if (hotplayer=="" || name==prevState.defaultPlayer) {
                                if (dev.input==name || dev.input=="") {
                                    hotplayer=name
                                } else {
                                    hotplayer=dev.input
                                }
                            }
                        }
                    }
                }
            }
            
            if (hotplayer) { return hotplayer }
        } 
                
        return defaultPlayer
    }
    
    function createLinkVolumes() {
        
        console.log(playerName, props.deviceProperties[playerName])
        
        let volumes=[];
        if (props.deviceProperties[playerName]) {
            var allvol=[playerName]
            if (props.deviceProperties[playerName].hasOwnProperty('linked')) {
                allvol=[playerName, ...props.deviceProperties[playerName].linked];
            }
        
            for (var i = 0; i < allvol.length; i++) {
                volumes.push(
                    <SonosVolume sendAlexaCommand={props.sendAlexaCommand} key={ allvol[i] } name={ allvol[i] } endpointId={ props.deviceByName(allvol[i]).endpointId } deviceProperties={ props.deviceProperties[allvol[i]] } />
                )
            }
        }
        return volumes
    }

    function handlePlayPause(event) {
        event.stopPropagation();
        if (props.deviceProperties[playerName].playbackState=='PLAYING') {
            props.sendAlexaCommand(playerName, device.endpointId, 'MusicController', "Pause")
        } else {
            props.sendAlexaCommand(playerName, device.endpointId, 'MusicController', "Play")
        }
    }; 


    function handleSkip(event) {
        event.stopPropagation();
        props.sendAlexaCommand(playerName, device.endpointId, 'MusicController', "Skip")
    }; 


    function handleStop(event) {
        event.stopPropagation();
        props.sendAlexaCommand(playerName, device.endpointId, 'MusicController', "Stop")
    }; 
    
    function toggleOverlay() {
        setShowOverlay(!showOverlay)
    }
    
    function handleMedia() {
        setMediaSelect(true)
    }

    function closeMediaSelect() {
        setMediaSelect(false)
    }

    function handleCover() {
        var elem = document.documentElement;
        elem.webkitRequestFullScreen();
        setCoverView(true)
    }

    function closeCover() {
        setCoverView(false)
        document.webkitExitFullscreen();
    }

    function addDefaultSrc(ev) {
        ev.target.src = '/image/sonos/logo'
    }
    
    return ( 
        props.deviceProperties.hasOwnProperty(playerName) ?
        <Card className={classes.card}>
            <CardMedia 
                className={classes.bigcover}
                image={props.deviceProperties[playerName] ? props.deviceProperties[playerName].art : coverDefault }
                title={props.deviceProperties[playerName] ? props.deviceProperties[playerName].title : ''}
                onClick={ () => toggleOverlay()}
            >
            { showOverlay ? <CoverDimmer onClick={ () => toggleOverlay()} />: null }
            { showOverlay && props.deviceProperties[playerName] ? 
            <div className={classes.dialogSongTextBox}>
                <div className={classes.songTextHolder}>
                    <Typography className={classes.dialogSongTitle} variant="h3">{props.deviceProperties[playerName].title}</Typography>
                    <Typography className={classes.dialogSongArtist} variant="h4">{props.deviceProperties[playerName].artist}</Typography>
                </div>
            </div>
            : null }
            <IconButton color="primary" className={classes.dialogGridButton} onClick={ (e) => props.setLayoutCard('PlayersLayout',{'player':playerName})}>
                <ViewModuleIcon />
            </IconButton>
            <IconButton color="primary" className={classes.dialogFavButton} onClick={ (e) => handleMedia(e)}>
                <QueueMusicIcon />
            </IconButton>
            { isMobile ? null :
            <IconButton color="primary" className={classes.dialogCoverButton} onClick={ (e) => handleCover(e)}>
                <FullscreenIcon />
            </IconButton>
            }

            <IconButton className={classes.dialogStopButton} onClick={ (e) => handleStop(e)}>
                <StopIcon />
            </IconButton>
            { props.deviceProperties[playerName] ?
            <Button variant="fab" color="primary" aria-label="play" className={classes.dialogPlayButton} onClick={ (e) => handlePlayPause(e)}>
                { props.deviceProperties[playerName].playbackState=='PLAYING' ? <PauseIcon /> : <PlayArrowIcon /> }
            </Button>
            : null }
            <IconButton className={classes.dialogSkipButton} onClick={ (e) => handleSkip(e)}>
                <SkipNextIcon />
            </IconButton>
            </CardMedia>
            <List>
                <SonosVolume sendAlexaCommand={props.sendAlexaCommand} key={ playerName } name={ playerName } endpointId={ props.deviceByName(playerName).endpointId } deviceProperties={ props.deviceProperties[playerName] } />
                { !props.deviceProperties[playerName].hasOwnProperty('linked') ? null :
                    props.deviceProperties[playerName].linked.map( linkedplayer =>
                        <SonosVolume sendAlexaCommand={props.sendAlexaCommand} key={ linkedplayer } name={ linkedplayer } endpointId={ props.deviceByName(linkedplayer).endpointId } deviceProperties={ props.deviceProperties[linkedplayer] } />
                    )
                }
            </List>
            { mediaSelect ?
                <SonosFavorites open={mediaSelect} close={ closeMediaSelect } />
                :null
            }
            { coverView ?
                <SonosCover playbackState={props.deviceProperties[playerName].playbackState} handleSkip={ handleSkip} handlePlayPause={handlePlayPause} title={props.deviceProperties[playerName].title} artist={props.deviceProperties[playerName].artist} src={props.deviceProperties[playerName].art} open={coverView} close={ closeCover } />
                :null
            }
        </Card> : null
    );
}


export default withData(SonosPlayerCard);
