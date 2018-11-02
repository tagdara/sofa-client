import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, withTheme } from '@material-ui/core/styles';
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

import FullscreenIcon from '@material-ui/icons/Fullscreen';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import QueueMusicIcon from '@material-ui/icons/QueueMusic';
import StopIcon from '@material-ui/icons/Stop';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import ViewModuleIcon from '@material-ui/icons/ViewModule';

import { withData } from '../dataContext';
import SonosVolume from './sonosvolume';
import SonosCover from './sonosCover';
import SonosFavorites from './sonosFavorites';

const styles = theme => ({

    card: {
        maxWidth: '480px',
        minWidth: '320px',
        flexDirection: "row",
        margin: 8,
        boxSizing: "border-box",
        justifyContent: "space-between",
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
    coverDimmer: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: theme.palette.background.default,
        opacity: "0.8",
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

class SonosPlayerCard extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
            playerName: '',
            showOverlay: true,
            mediaSelect: false,
            coverView: false,
            coverDefault: '/react/images/receiver.png?v2',
        }
    }
    
    static getDerivedStateFromProps(nextProps, prevState) {

        // This ensures that if the player selected is not a coordinator, the coordinator is selected instead.
        var changes={}
        
        if (nextProps.deviceProperties.hasOwnProperty(nextProps.name)) {
            if (nextProps.deviceProperties[nextProps.name].hasOwnProperty('input')) {
                changes.playerName=nextProps.deviceProperties[nextProps.name].input
            }
        }

        return changes
    }
    
    
    createLinkVolumes = () => {
        
        let volumes=[];
        if (this.props.deviceProperties[this.state.playerName]) {
            var allvol=[this.props.name]
            if (this.props.deviceProperties[this.state.playerName].hasOwnProperty('linked')) {
                allvol=[this.state.playerName, ...this.props.deviceProperties[this.state.playerName].linked];
            }
        
            for (var i = 0; i < allvol.length; i++) {
                volumes.push(
                    <SonosVolume sendAlexaCommand={this.props.sendAlexaCommand} key={ allvol[i] } name={ allvol[i] } deviceProperties={ this.props.deviceProperties[allvol[i]] } sendMessage={ this.props.sendMessage } />
                )
            }
        }

        return volumes
    }

    handlePlayPause = event => {
        event.stopPropagation();
        if (this.props.deviceProperties[this.state.playerName].playbackState=='PLAYING') {
            this.props.sendAlexaCommand(this.state.playerName, this.props.device.endpointId, 'MusicController', "Pause")
        } else {
            this.props.sendAlexaCommand(this.state.playerName, this.props.device.endpointId, 'MusicController',"Play")
        }
    }; 


    handleSkip = event => {
        event.stopPropagation();
        this.props.sendAlexaCommand(this.state.playerName, this.props.device.endpointId, 'MusicController', "Skip")
    }; 


    handleStop = event => {
        event.stopPropagation();
        this.props.sendAlexaCommand(this.state.playerName,  this.props.device.endpointId, 'MusicController', "Stop")
    }; 
    
    toggleOverlay = event => {
        this.setState({ showOverlay: !this.state.showOverlay})
    }
    
    handleMedia = event => {
        this.setState({ mediaSelect: true })
    }

    closeMediaSelect = event => {
        this.setState({ mediaSelect: false })
    }

    handleCover = event => {
        var elem = document.documentElement;
        elem.webkitRequestFullScreen();
        this.setState({ coverView: true })
    }

    closeCover = event => {
        this.setState({ coverView: false })
        document.webkitExitFullscreen();
    }


    render() {

        const { classes } = this.props;

        return ( 
                    //&& this.props.deviceProperties[this.state.playerName].hasOwnProperty('input') ?
                    <Card className={classes.card}>
                        <CardMedia 
                            className={classes.bigcover}
                            image={this.props.deviceProperties[this.state.playerName] ? this.props.deviceProperties[this.state.playerName].art : this.state.coverDefault }
                            title={this.props.deviceProperties[this.state.playerName] ? this.props.deviceProperties[this.state.playerName].title : ''}
                            onClick={ () => this.toggleOverlay()}
                        >
                        { this.state.showOverlay ? <div className={classes.coverDimmer} onClick={ () => this.toggleOverlay()}></div>: null }
                        { this.state.showOverlay && this.props.deviceProperties[this.state.playerName] ? 
                        <div className={classes.dialogSongTextBox}>
                            <div className={classes.songTextHolder}>
                                <Typography className={classes.dialogSongTitle} variant="display2">{this.props.deviceProperties[this.state.playerName].title}</Typography>
                                <Typography className={classes.dialogSongArtist} variant="display1">{this.props.deviceProperties[this.state.playerName].artist}</Typography>
                            </div>
                        </div>
                        : null }
                        <IconButton color="primary" className={classes.dialogGridButton} onClick={ (e) => this.props.handleGrid(e)}>
                            <ViewModuleIcon />
                        </IconButton>
                        <IconButton color="primary" className={classes.dialogFavButton} onClick={ (e) => this.handleMedia(e)}>
                            <QueueMusicIcon />
                        </IconButton>
                        <IconButton color="primary" className={classes.dialogCoverButton} onClick={ (e) => this.handleCover(e)}>
                            <FullscreenIcon />
                        </IconButton>

                        <IconButton className={classes.dialogStopButton} onClick={ (e) => this.handleStop(e)}>
                            <StopIcon />
                        </IconButton>
                        { this.props.deviceProperties[this.state.playerName] ?
                        <Button variant="fab" color="primary" aria-label="play" className={classes.dialogPlayButton} onClick={ (e) => this.handlePlayPause(e)}>
                            { this.props.deviceProperties[this.state.playerName].playbackState=='PLAYING' ? <PauseIcon /> : <PlayArrowIcon /> }
                        </Button>
                        : null }
                        <IconButton className={classes.dialogSkipButton} onClick={ (e) => this.handleSkip(e)}>
                            <SkipNextIcon />
                        </IconButton>
                        </CardMedia>
                        {this.createLinkVolumes()}
                        { this.state.mediaSelect ?
                            <SonosFavorites open={this.state.mediaSelect} close={ this.closeMediaSelect } />
                            :null
                        }
                        { this.state.coverView ?
                            <SonosCover playbackState={this.props.deviceProperties[this.state.playerName].playbackState} handleSkip={ this.handleSkip} handlePlayPause={this.handlePlayPause} title={this.props.deviceProperties[this.state.playerName].title} artist={this.props.deviceProperties[this.state.playerName].artist} src={this.props.deviceProperties[this.state.playerName].art} open={this.state.coverView} close={ this.closeCover } />
                            :null
                        }

                    </Card>
        );
    }
}

SonosPlayerCard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withTheme()(withStyles(styles)(SonosPlayerCard));
