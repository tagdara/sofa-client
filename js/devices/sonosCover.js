import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';

import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import StopIcon from '@material-ui/icons/Stop';
import SkipNextIcon from '@material-ui/icons/SkipNext';


const styles = theme => ({
    bigcamholder: {
        position: "fixed",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        
    },
    bigcamDialog: {
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
    contentButtons: {
        flexGrow: 0,
        display: "flex",
        justifyContent: "center",
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
    fab: {
        margin: 8,
    },
    title: {
        display: "flex",
        justifyContent: "flex-end",
    }
});

class SonosCover extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            rotation: 0
        }
        this.rotate = this.rotate.bind(this);
        
    }

    enableScaling() {
        var viewport = document.querySelector("meta[name=viewport]");
        viewport.setAttribute('content', "viewport-fit=cover, width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes");
    }

    disableScaling() {
        var viewport = document.querySelector("meta[name=viewport]");
        viewport.setAttribute('content', "viewport-fit=cover, width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no");
    }
    
    closeDialog = e => {
        this.disableScaling()
        this.props.closeDialog()
    }
    
    componentDidMount() {
        this.enableScaling()
    }
    

    rotate() {
        var newRotation=0;
        if (this.state.rotation!=90) {
            newRotation=90
        } 

        this.setState({
            rotation: newRotation,
        })
    }
  
    render() {
        
        const { classes } = this.props;
        const { rotation } =  this.state;
        
        return (
            <Dialog fullScreen open={this.props.open} onClose={() =>  this.props.close()} className={classes.bigcamDialog} PaperProps ={{ classes: { root: classes.paper}}}>
                <DialogTitle className={classes.title}>
                    <IconButton onClick={() => this.props.close()} aria-label="Close" color="primary" autoFocus>
                        <CloseIcon />
                    </IconButton>
                </DialogTitle> 
                <DialogContent className={classes.content}>
                    <div className={classes.contentLeft}>
                        <img className={classes.coverArt} src={this.props.src}/>
                    </div>
                    <div className={classes.contentRight}>
                        <div className={classes.contentText} >
                            <Typography className={classes.titleText} variant="display4" >{this.props.title}</Typography>
                            <Typography className={classes.artistText} variant="display3" >{this.props.artist}</Typography>
                        </div>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={ (e) => this.props.handlePlayPause(e) } aria-label="Close" color="primary" autoFocus>
                        { this.props.playbackState=='PLAYING' ? <PauseIcon /> : <PlayArrowIcon /> }
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