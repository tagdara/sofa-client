import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Divider from '@material-ui/core/Divider';

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

class SelectPlayer extends React.Component {
    
    render() {
        
        const { classes, open, close, devices, deviceProperties } = this.props;
        
        return (
            <SofaDialog title="Sonos Zones" open={open} close={close}>
                <DialogContent className={classes.dialogContent }>
                    { devices.map((device) => (
                        <Sonos sendAlexaCommand={this.props.sendAlexaCommand} devices={devices} chooseActivePlayer={this.props.chooseActivePlayer} key={device.endpointId+'sonosgi'} name={ device.friendlyName } device={ device } deviceProperties={ deviceProperties[device.friendlyName] } linkedPlayers={ deviceProperties }/>
                    ))}
                </DialogContent>
                <Divider />
                <DialogActions className={classes.dialogActions} >
                    <Button onClick={(e) => this.props.close(e)} color="primary" autoFocus>OK</Button>
                </DialogActions>
            </SofaDialog>
        )
    }
};

SelectPlayer.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SelectPlayer);
