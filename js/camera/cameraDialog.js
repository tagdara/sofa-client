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
        background: "#222",
        opacity: "1.0", 
        margin: "0 auto",
        padding: 0,
    },
    bigcam: {
        width: "100%",
        height: "auto !important",
        maxWidth: "100%",
        background: "#222",
        opacity: "1.0", 
        margin: "auto auto",
        padding: 0,
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
        zIndex: "-99"
    }    
    
});

class CameraDialog extends React.Component {

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
            <Dialog fullScreen open={this.props.showDialog} onClose={() =>  this.closeDialog()} className={classes.bigcamDialog} PaperProps ={{ classes: { root: classes.paper}}}>
                <DialogActions>
                    <Button size="small" color="primary" onClick={() => this.props.changeInterval()}>
                        <TimerIcon />{this.props.refreshInterval/1000}
                    </Button>
                    <IconButton onClick={() => this.rotate()} aria-label="Rotate" color="primary" >
                        <ScreenRotationIcon />
                    </IconButton>
                    <IconButton onClick={() => this.closeDialog()} aria-label="Close" color="primary" autoFocus>
                        <CloseIcon />
                    </IconButton>
                </DialogActions>
                <img className={this.state.rotation>0 ? classes.bigcamRotated : classes.bigcam} style={{transform: `rotate(${rotation}deg)`}} src={this.props.src}/>
            </Dialog>
        )
    }
};
CameraDialog.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(CameraDialog);
