import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import ScreenRotationIcon from '@material-ui/icons/ScreenRotation';
import CloseIcon from '@material-ui/icons/Close';
import Sonos from './sonos';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Zone from './zone';
import Avatar from '@material-ui/core/Avatar';
import WarningIcon from '@material-ui/icons/Warning';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import Button from '@material-ui/core/Button';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import Slide from  '@material-ui/core/Slide';

const styles = theme => ({
    
    closed: {
        backgroundColor: "#6a6",
    },
    open: {
        backgroundColor: "#e66",
    },
    countLabel: {
        padding: "8 16",
    },
    card: {
        display: 'flex',
        maxWidth: '480px',
        margin: 8,
        boxSizing: "border-box",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 16,
        width: '100%',
    },    
    content: {
        minWidth: 0,
        padding: "0 !important",
        flexGrow:1,
        display: "flex",
        alignItems: "center"
    },
    camGridDialog: {
        margin: "0 auto",
        display: "flex",
        alignItems: "center",
    },
    camGrid: {
        display: "flex",
        flexWrap: "wrap",
        maxWidth: 1440,
        width: "100%",

        paddingBottom: "env(safe-area-inset-bottom)",
        overflowY: "auto",
    },
    paper: {
        boxShadow: "none",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",

    },
    camGridToolbar: {
        paddingTop: "env(safe-area-inset-top)",
    },
    gridTitle: {
        flexGrow: 1,
    },
    tabTitle: {
        backgroundColor: theme.palette.primary[700],
        padding: 0,
        paddingTop: "env(safe-area-inset-top)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
    },
    dialogTitle: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexGrow: 1,
        color: theme.palette.primary.contrastText,
    },
    dialogActions: {
        paddingBottom: "env(safe-area-inset-bottom)",
    }

});


function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class ZoneGrid extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            filter: 'open',
        }
    }
    
    toggleFilter = event => {
        if (this.state.filter=='open') {
            this.setState({ filter:'all'})
        } else {
            this.setState({ filter:'open'}) 
        }
    }
    
    render() {
        
        const { classes, theme, fullScreen } = this.props;
        
        return (
            <Dialog 
                fullScreen={fullScreen}
                fullWidth={true}
                maxWidth={'md'}
                open={this.props.showGrid}
                onClose={this.props.closeGrid}
                TransitionComponent={Transition}
                className={fullScreen ? classes.fullDialog : classes.normalDialog }
            >
                <DialogTitle className={classes.tabTitle}>
                    <Toolbar className={classes.appBar} elevation={0}>
                        { this.props.zoneCount('open')>0 ? 
                            <Typography variant="title" color="inherit" className={classes.dialogTitle}>{this.props.zoneCount('open')} Zones Are Not Secure</Typography>
                        : 
                            <Typography variant="title" color="inherit" className={classes.dialogTitle}>All Zones Secure</Typography>
                        }
                    </Toolbar>
                </DialogTitle>
                <DialogContent>
                    <div className={classes.camGrid}>
                        { 
                        this.props.devices.map((device) =>
                            <Zone key={ device.endpointId } name={ device.friendlyName } filter={ this.props.filter} device={ device } deviceProperties={ this.props.deviceProperties[device.friendlyName] } sender={this.props.sender} updateDevice={this.props.updateDevice} />
                        )}
                    </div>
                </DialogContent>
                <DialogActions className={classes.dialogActions} >
                    <Button onClick={(e) =>  this.props.closeGrid(e)} color="primary" autoFocus>OK</Button>
                </DialogActions>
            </Dialog>
        )
    }
};

ZoneGrid.propTypes = {
    classes: PropTypes.object.isRequired,
    fullScreen: PropTypes.bool.isRequired,
};

export default withStyles(styles)(withMobileDialog()(ZoneGrid));
