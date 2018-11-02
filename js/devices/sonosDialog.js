import React from 'react';
import PropTypes from 'prop-types';
import { withTheme } from 'material-ui/styles';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import StopIcon from '@material-ui/icons/Stop';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import SonosVolume from './sonosvolume';

const styles = theme => ({

    dialog: {
        paddingTop: "env(safe-area-inset-top)",
        paddingBottom: "env(safe-area-inset-bottom)",
        minWidth: '320px',
        boxSizing: "border-box",
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
        backgroundColor: secondary,
        opacity: "0.8",
    },
    dialogSongTextBox: {
        color: "#fff",
        position: "absolute",
        padding: 16,
        top:0,
    },
    dialogSongTitle: {
        fontSize:"3rem",
        paddingBottom:16,
    },
    dialogSongArtist: {
        fontSize:"2.2rem",
        fontWeight:200,
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
});

class SonosDialog extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
            showOverlay: true,
            showdialog: false,
        }
    }
    
    createLinkVolumes = () => {
        
        let volumes=[];
        let allvol=[this.props.name, ...this.props.deviceProperties.linked];
        
        for (var i = 0; i < allvol.length; i++) {
            volumes.push(
                <SonosVolume key={ allvol[i] } name={ allvol[i] } deviceProperties={ this.props.linkedPlayers[allvol[i]] } sendMessage={ this.props.sendMessage } />
            )
        }

        return volumes
    }

    handlePlayPause = event => {
        event.stopPropagation();
        if (this.props.deviceProperties.playbackState=='PLAYING') {
            var ops={"op":"set", "path":"discovery/"+this.props.name+"/MusicController/playbackState", "command":"Pause", "value":true}
        } else {
            var ops={"op":"set", "path":"discovery/"+this.props.name+"/MusicController/playbackState", "command":"Play", "value":true}
        }
        this.props.sendMessage(JSON.stringify(ops));
    }; 


    handleSkip = event => {
        event.stopPropagation();
        var ops={"op":"set", "path":"discovery/"+this.props.name+"/MusicController/playbackState", "command":"Skip", "value":true}
        this.props.sendMessage(JSON.stringify(ops));
    }; 


    handleStop = event => {
        event.stopPropagation();
        var ops={"op":"set", "path":"discovery/"+this.props.name+"/MusicController/playbackState", "command":"Stop", "value":true}
        this.props.sendMessage(JSON.stringify(ops));
    }; 
    
    toggleOverlay = event => {
        this.setState({ showOverlay: !this.state.showOverlay})
    }
    

    render() {

        const { classes, theme } = this.props;

        return (
                <Dialog fullScreen open={this.props.showdialog} onClose={() => this.props.closeDialog()}  className={this.props.classes.dialog}>
                    <DialogContent className={classes.dialogContent}>
                    <Card className={classes.dialogcard}>
                        <CardMedia 
                            className={classes.bigcover}
                            image={this.props.deviceProperties.art}
                            title={this.props.deviceProperties.title}
                            onClick={ () => this.toggleOverlay()}
                        >
                        { this.state.showOverlay ? <div className={classes.coverDimmer} onClick={ () => this.toggleOverlay()}></div>: null }
                        { this.state.showOverlay ? 
                        <div className={classes.dialogSongTextBox}>
                            <Typography className={classes.dialogSongTitle} variant="display2">{this.props.deviceProperties.title}</Typography>
                            <Typography className={classes.dialogSongArtist} variant="display1">{this.props.deviceProperties.artist}</Typography>
                        </div>
                        : null }
                        <IconButton className={classes.dialogStopButton} onClick={ (e) => this.handleStop(e)}>
                            <StopIcon />
                        </IconButton>
                        <Button variant="fab" color="primary" aria-label="play" className={classes.dialogPlayButton} onClick={ (e) => this.handlePlayPause(e)}>
                            { this.props.deviceProperties.playbackState=='PLAYING' ? <PauseIcon /> : <PlayArrowIcon /> }
                        </Button>
                        <IconButton className={classes.dialogSkipButton} onClick={ (e) => this.handleSkip(e)}>
                            <SkipNextIcon />
                        </IconButton>
                        </CardMedia>
                        {this.createLinkVolumes()}
                    </Card>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => this.props.closeDialog()} color="primary" autoFocus>
                            OK
                        </Button>
                    </DialogActions>
                </Dialog>

            : null
           
        );
    }
}

SonosDialog.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(SonosDialog);
