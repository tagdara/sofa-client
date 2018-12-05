import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Avatar from '@material-ui/core/Avatar';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';

import CloseIcon from '@material-ui/icons/Close';
import WarningIcon from '@material-ui/icons/Warning';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';

import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';

import Zone from './zone';
import SofaDialog from '../sofaDialog';

const styles = theme => ({

    dialogActions: {
        paddingBottom: "env(safe-area-inset-bottom)",
    },
    listDialogContent: {
        padding: 0,
    }

});

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
        
        const { classes, fullScreen } = this.props;
        
        return (
            <SofaDialog open={this.props.open} close={this.props.close} title={ this.props.zoneCount('open')>0 ? this.props.zoneCount('open')+" Zones Are Not Secure" : "All Zones Secure"} >
                <DialogContent className={classes.listDialogContent}>
                    <List>
                        { this.props.devices.map((device) =>
                            <Zone key={ device.endpointId } name={ device.friendlyName } filter={ this.props.filter} device={ device } deviceProperties={ this.props.deviceProperties[device.friendlyName] } />
                        )}
                    </List>
                </DialogContent>
                <Divider />
                <DialogActions className={classes.dialogActions} >
                    <Button onClick={(e) =>  this.props.close(e)} color="primary" autoFocus>OK</Button>
                </DialogActions>
            </SofaDialog>
        )
    }
};

ZoneGrid.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ZoneGrid);
