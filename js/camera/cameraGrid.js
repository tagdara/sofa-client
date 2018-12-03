import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Divider from '@material-ui/core/Divider';

import SecurityCamera from './securitycamera';
import CameraRecordingList from './cameraRecordingList';
import SofaDialog from '../sofaDialog';
import Card from '@material-ui/core/Card';

const styles = theme => ({
    
    lGrid: {
        display: "flex",
        flexWrap: "wrap",
        padding: 0,
        flex: "auto",
        flexGrow: 0,
        margin: "0 0 auto 0",
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
    },
    gridPlaceholder: {
        height: 2,
        minWidth: 320,
        flexGrow: 1,
    },
    dialogContent: {
        height: "100%",
        padding: 8,
    },
    dialogMaxWidth: {
        height: "100%",
        padding:  0,
    },
    cameraSelect: {
        margin: 4,
        padding: 0,
        minWidth: 320,
    },
});

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
        
        const { classes } = this.props;
        
        return (
            <SofaDialog title={this.props.name} open={this.props.open} close={this.props.close} tabChange={this.handleTab} tabValue={this.state.frontTab}
                        tabs={ ['Live','Recorded']} >
                { this.state.frontTab==0 ?
                    <DialogContent className={classes.dialogMaxWidth}>
                        <div className={classes.lGrid}>
                        {
                        this.props.cameras.map((name) => 
                            <Card key={name} className={classes.cameraSelect}>
                                <SecurityCamera name={ name } sender={this.props.sender} ></SecurityCamera>
                            </Card>
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
            </SofaDialog>
        )
    }
}

CameraDialog.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CameraDialog);
