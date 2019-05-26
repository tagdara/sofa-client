import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import ScreenRotationIcon from '@material-ui/icons/ScreenRotation';
import CloseIcon from '@material-ui/icons/Close';
import TimerIcon from '@material-ui/icons/Timer';
import Paper from '@material-ui/core/Paper';
import Fab from '@material-ui/core/Fab';

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

    bigcamxx: {
        height: "100% !important",
        width: "auto !important",
        maxWidth: "100%",
        maxHeight: "100%",
        background: "#222",
        opacity: "1.0", 
        margin: "0 auto",
        padding: 0,
    },
    bigcam: {
        width: "100%",
        height: "auto !important",
        maxWidth: "100%",
        maxHeight: "100%",
        background: "#222",
        opacity: "1.0", 
        margin: "auto auto",
        padding: 0,
        borderRadius: 4,
    },

    bigcamRotatedworks: {
        position: "absolute",
        top: 0,
        left: 0,
        height: "100vw",
        maxWidth: "initial",
        padding: 0,
        margin: "auto auto",
        marginTop: "calc((100vh - 100vw) / 2.0)",
        marginLeft: "calc((100vw * -1) /2.5) !important",
    },    
    bigcamRotated: {
        position: "absolute",
        top: 0,
        left: 0,
        height: "100vw",
        maxWidth: "initial",
        padding: 0,
        margin: "auto auto",
        marginTop: "calc((100vh - 100vw) / 2.5)",
        marginLeft: "calc((100vw * -1) /2.5) !important",
        borderRadius: 4,
    },
    bcp: {
        margin: 4,
        maxHeight: "100%",
    },
    topbutton: {
        zIndex: 2000,
    },
    closebutton: {
        zIndex: 2000,
        position: "absolute",
        top: 16,
        right: 16,
    },
    rotatebutton: {
        zIndex: 2000,
        position: "absolute",
        top: 16,
        right: 72,
    },
    ratebutton: {
        zIndex: 2000,
        position: "absolute",
        top: 16,
        right: 190,
    }   
});

class CameraDialog extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            rotation: 0,
            loaded: false
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
        if( this.props.live && Hls.isSupported() ) {
            var hls = new Hls();
            var video=this.videoRef;
            hls.loadSource('https://home.dayton.home:4443/hls/'+this.props.name+'.m3u8');
            hls.attachMedia(video);
            hls.on(Hls.Events.MANIFEST_PARSED,function() { video.play(); });
        } 
    }

    componentDidUpdate() {
        if( this.props.live && Hls.isSupported() && !this.state.loaded ) {
            var hls = new Hls();
            var video=this.videoRef;
            hls.loadSource('https://home.dayton.home:4443/hls/'+this.props.name+'.m3u8');
            hls.attachMedia(video);
            hls.on(Hls.Events.MANIFEST_PARSED,function() { video.play(); });
            this.setState({loaded: true})
        }

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
        
        const { classes, live } = this.props;
        const { rotation } =  this.state;
        const srcurl="https://home.dayton.home:4443/hls/"+this.props.name+".m3u8"
        
        return (
            <Dialog fullScreen open={this.props.showDialog} onClose={() =>  this.closeDialog()} className={classes.bigcamDialog} PaperProps ={{ classes: { root: classes.paper}}}>
                { !live && 
                <Fab size="medium" aria-label="Rate" className={classes.ratebutton} onClick={() => this.props.changeInterval()}  >
                    <TimerIcon />{this.props.refreshInterval/1000}
                </Fab>
                }
                <Fab size="medium" color="primary" aria-label="Close" className={classes.closebutton} onClick={() => this.closeDialog()} >
                    <CloseIcon />
                </Fab>
                <Fab size="medium" aria-label="Rotate" className={classes.rotatebutton} onClick={() => this.rotate()}>
                    <ScreenRotationIcon />
                </Fab>
                <Paper className={classes.bcp} >
                    { live ?
                    <video controls muted autoPlay playsInline id="video" className={this.state.rotation>0 ? classes.bigcamRotated : classes.bigcam} style={{transform: `rotate(${rotation}deg)`}} ref={video => this.videoRef = video}>
                        <source src={srcurl} type="application/x-mpegURL" />
                    </video>
                    :
                    <img className={this.state.rotation>0 ? classes.bigcamRotated : classes.bigcam} style={{transform: `rotate(${rotation}deg)`}} src={this.props.src}/>
                    }
                </Paper>
            </Dialog>
        )
    }
};

CameraDialog.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(CameraDialog);
