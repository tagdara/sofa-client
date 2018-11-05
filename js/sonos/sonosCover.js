import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

import CloseIcon from '@material-ui/icons/Close';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import StopIcon from '@material-ui/icons/Stop';
import SkipNextIcon from '@material-ui/icons/SkipNext';


const styles = theme => ({

    bigDialog: {
        backgroundColor: "#222",
        paddingTop: "env(safe-area-inset-top)",
        paddingBottom: "env(safe-area-inset-bottom)",
        minWidth: '320px',
        boxSizing: "border-box",
    },
    root: {
        backgroundColor: "#111"
    },
    paper: {
        backgroundColor: "#111",
        boxShadow: "none",
        overflow: "hidden"
    },

    coverArt: {
        width: "100%",
        maxWidth: "100%",
        background: "#222",
        opacity: "1.0", 
        margin: "auto auto",
    },
    content: {
        boxSizing: "border-box",
        display: "flex",
        padding: "0 48 48 48",
    },
    contentLeft: {
        flexGrow: 1,
        flexBasis: 0,
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
    },
    contentRight: {
        flexGrow: 1,
        flexBasis: 0,
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
    },
    contentText: {
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
    },
    titleText: {
        padding: "0 24 0 24",
        color: "#ccc",
    },
    artistText: {
        padding: "0 24 0 24",
        color: "#999",
    },
});

class SonosCover extends React.Component {

    addDefaultSrc(ev){
        ev.target.src = '/image/sonos/darklogo'
    }
  
    render() {
        
        const { classes, open, title, artist, src, playbackState } = this.props;
        
        return (
            <Dialog fullScreen open={open} onClose={() => this.props.close()} className={classes.bigDialog} PaperProps ={{ classes: { root: classes.paper}}}>
                <DialogTitle className={classes.title}>
                    <IconButton onClick={() => this.props.close()} aria-label="Close" color="primary" autoFocus>
                        <CloseIcon />
                    </IconButton>
                </DialogTitle> 
                <DialogContent className={classes.content}>
                    <div className={classes.contentLeft}>
                        <img onError={this.addDefaultSrc} className={classes.coverArt} src={src}/>
                    </div>
                    <div className={classes.contentRight}>
                        <div className={classes.contentText} >
                            <Typography className={classes.titleText} variant="display4" >{title}</Typography>
                            <Typography className={classes.artistText} variant="display3" >{artist}</Typography>
                        </div>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={ (e) => this.props.handlePlayPause(e) } aria-label="Close" color="primary" autoFocus>
                        { playbackState=='PLAYING' ? <PauseIcon /> : <PlayArrowIcon /> }
                    </Button>
                    <Button onClick={ (e) => this.props.handleSkip(e) } aria-label="Close" color="primary" autoFocus>
                        <SkipNextIcon />
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }
};

SonosCover.propTypes = {
    classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(SonosCover);