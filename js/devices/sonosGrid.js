import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import ScreenRotationIcon from '@material-ui/icons/ScreenRotation';
import CloseIcon from '@material-ui/icons/Close';
import Sonos from './sonos';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    
    
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


});

class SonosGrid extends React.Component {

    render() {
        
        const { classes, theme } = this.props;
        
        return (
            <Dialog fullScreen open={this.props.showGrid}  className={classes.camGridDialog} PaperProps ={{ classes: { root: classes.paper}}}>
                <AppBar position="static" className={classes.camGridToolbar}>
                    <Toolbar>
                        <Typography variant="title" color="inherit" className={classes.gridTitle}>
                            Sonos Players
                        </Typography>
                        <IconButton className={classes.menuButton} color="inherit" aria-label="Menu" onClick={(e) =>  this.props.closeGrid(e)}>
                            <CloseIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>                
                <div className={classes.camGrid}>
                { this.props.devices.map((device) => (
                    <Sonos chooseActivePlayer={this.props.chooseActivePlayer} key={device.endpointId} name={ device.friendlyName } filter={ this.props.filter} device={ device } deviceProperties={ this.props.deviceProperties[device.friendlyName] } linkedPlayers={ this.props.deviceProperties } sendMessage={this.props.sendMessage}/>
                    ))
                }
                </div>
            </Dialog>
        )
    }
};

SonosGrid.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(SonosGrid);
