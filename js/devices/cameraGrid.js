import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import ScreenRotationIcon from '@material-ui/icons/ScreenRotation';
import CloseIcon from '@material-ui/icons/Close';
import SecurityCamera from './securitycamera';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    
    
    camGridDialog: {
        overflowX: "auto",
    },
    camGrid: {
        display: "flex",
        flexWrap: "wrap",

        paddingBottom: "env(safe-area-inset-bottom)",
        overflowY: "auto",
    },
    paper: {
        backgroundColor: "#111",
        boxShadow: "none",
        overflow: "hidden"
    },
    camGridToolbar: {
        color: "#AAA",
        paddingTop: "env(safe-area-inset-top)",
        backgroundColor: "#222",
    },
    gridTitle: {
        flexGrow: 1,
    },


});

class CameraDialog extends React.Component {

    render() {
        
        const { classes, theme } = this.props;
        
        return (
            <Dialog fullScreen open={this.props.showGrid} onClose={() =>  this.props.closeDialog()} className={classes.camGridDialog} PaperProps ={{ classes: { root: classes.paper}}}>
                <AppBar position="static" className={classes.camGridToolbar}>
                    <Toolbar>
                        <Typography variant="title" color="inherit" className={classes.gridTitle}>
                            Cameras
                        </Typography>
                        <IconButton className={classes.menuButton} color="inherit" aria-label="Menu" onClick={() =>  this.props.closeDialog()}>
                            <CloseIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>                
                <div className={classes.camGrid}>
                {
                    this.props.cameras.map((name) => 
                        <SecurityCamera key={ name } name={ name } sender={this.props.sender} ></SecurityCamera>
                    )
                }
                </div>
            </Dialog>
        )
    }
};

CameraDialog.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(CameraDialog);
