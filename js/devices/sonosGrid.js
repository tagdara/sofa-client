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
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import Slide from  '@material-ui/core/Slide';
import withMobileDialog from '@material-ui/core/withMobileDialog';

import Sonos from './sonos';


const styles = theme => ({
    

    lGrid: {
        display: "flex",
        flexWrap: "wrap",

        padding: 0,
        flex: "auto",
        flexGrow: 0,
        margin: "0 0 auto 0",
    },
    dialogContent: {
        height: "100%",
        padding: 8,
    },
    gridPlaceholder: {
        height: 2,
        minWidth: 320,
        margin: "2 2",
        boxSizing: "border-box",
        flexGrow: 1,
        flexBasis: 0,
        padding: "8 16",
    },
    tabRow: {
        color: theme.palette.primary.contrastText,
        display: "flex",
        justifyContent: "center",
    },
    tabInfo: {
        color: theme.palette.primary.contrastText,
        backgroundColor: theme.palette.primary[500],
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
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


class SonosGrid extends React.Component {
    
    componentDidMount() {
        console.log(this.props.deviceProperties)
    }
    
    render() {
        
        const { classes, fullScreen } = this.props;
        
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
                    <Toolbar elevation={0}>
                        <Typography variant="title" color="inherit" className={classes.dialogTitle}>
                            Sonos Zones
                        </Typography>
                    </Toolbar>
                </DialogTitle>
                <Divider />
                <DialogContent className={classes.dialogContent }>
                    <div className={classes.lGrid }>
                        { this.props.devices.map((device) => (
                            <Sonos sendAlexaCommand={this.props.sendAlexaCommand} devices={this.props.devices} chooseActivePlayer={this.props.chooseActivePlayer} key={device.endpointId+'sonosgi'} name={ device.friendlyName } filter={ this.props.filter} device={ device } deviceProperties={ this.props.deviceProperties[device.friendlyName] } linkedPlayers={ this.props.deviceProperties } sendMessage={this.props.sendMessage}/>
                            ))
                        }
                        <div className={classes.gridPlaceholder}></div>
                    </div>
                </DialogContent>
                <Divider />
                <DialogActions className={classes.dialogActions} >
                    <Button onClick={(e) => this.props.closeGrid(e)} color="primary" autoFocus>OK</Button>
                </DialogActions>
            </Dialog>
        )
    }
};

SonosGrid.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(withMobileDialog()(SonosGrid));
