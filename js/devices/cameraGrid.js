import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import Slide from  '@material-ui/core/Slide';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Divider from '@material-ui/core/Divider';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import SecurityCamera from './securitycamera';
import CameraRecordingList from '../cameraRecordingList';

const styles = theme => ({
    
    

    lGrid: {
        display: "flex",
        flexWrap: "wrap",
        padding: 0,
        flex: "auto",
        flexGrow: 0,
        margin: "0 0 auto 0",
    },
    paper: {
        backgroundColor: "#424242",
        boxShadow: "none",
        overflow: "hidden"
    },
    tabTitle: {
        backgroundColor: '#424242',
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
        backgroundColor: '#424242',
        paddingBottom: "env(safe-area-inset-bottom)",
    },
    gridPlaceholder: {
        height: 2,
        minWidth: 320,
        flexGrow: 1,
    },
    dialogContent: {
        backgroundColor: '#111',
        height: "100%",
        padding: 8,
    },
    dialogMaxWidth: {
        backgroundColor: '#111',
        height: "100%",
        padding: "8 0",
    },

});

function Transition(props) {
    return <Slide direction="up" {...props} />;
}

class CameraDialog extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            frontTab: 0,
        }
    }
    
    handleTab = (event, tabno) => {
        if (tabno==0) { this.setState({frontTab: tabno})}
        if (tabno==1) { this.setState({frontTab: tabno})}
    };   

    render() {
        
        const { classes, fullScreen } = this.props;
        
        return (
            <Dialog 
                fullScreen={fullScreen}
                fullWidth={true}
                maxWidth={'md'}
                open={this.props.open}
                onClose={this.props.close}
                TransitionComponent={Transition}
                className={fullScreen ? classes.fullDialog : classes.normalDialog }
                PaperProps ={{ classes: { root: classes.paper}}}
            >
                <DialogTitle className={classes.tabTitle}>
                    <Tabs className={classes.tabRow} value={this.state.frontTab} onChange={this.handleTab}>
                        <Tab label="Live" />
                        <Tab label="Recorded" />
                    </Tabs>
                </DialogTitle>
                { this.state.frontTab==0 ?
                    <DialogContent className={fullScreen ? classes.dialogMaxWidth : classes.dialogContent }>
                        <div className={classes.lGrid}>
                        {
                        this.props.cameras.map((name) => 
                            <SecurityCamera key={ name } name={ name } sender={this.props.sender} ></SecurityCamera>
                        )}
                            <div className={classes.gridPlaceholder}></div>
                        </div>
                    </DialogContent>
                :
                    <CameraRecordingList cameras={this.props.cameras} />
                }
                <Divider />
                <DialogActions className={classes.dialogActions} >
                    <Button onClick={(e) => this.props.close(e)} color="primary" autoFocus>OK</Button>
                </DialogActions>
            </Dialog>
        )
    }
}

CameraDialog.propTypes = {
    classes: PropTypes.object.isRequired,
    fullScreen: PropTypes.bool.isRequired
};

export default withStyles(styles)(withMobileDialog()(CameraDialog));
