import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';

import Sonos from './sonos';
import SofaDialog from '../sofaDialog'


const styles = theme => ({
    
    dialogContent: {
        height: "100%",
        padding: 8,
    },
    dialogActions: {
        paddingBottom: "env(safe-area-inset-bottom)",
    }

});

class SonosGrid extends React.Component {
    
    render() {
        
        const { classes } = this.props;
        
        return (
            <SofaDialog title="Sonos Zones" open={this.props.showGrid} close={this.props.closeGrid}>
                <DialogContent className={classes.dialogContent }>
                    { this.props.devices.map((device) => (
                        <Sonos sendAlexaCommand={this.props.sendAlexaCommand} devices={this.props.devices} chooseActivePlayer={this.props.chooseActivePlayer} key={device.endpointId+'sonosgi'} name={ device.friendlyName } filter={ this.props.filter} device={ device } deviceProperties={ this.props.deviceProperties[device.friendlyName] } linkedPlayers={ this.props.deviceProperties }/>
                    ))}
                </DialogContent>
                <Divider />
                <DialogActions className={classes.dialogActions} >
                    <Button onClick={(e) => this.props.closeGrid(e)} color="primary" autoFocus>OK</Button>
                </DialogActions>
            </SofaDialog>
        )
    }
};

SonosGrid.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SonosGrid);
