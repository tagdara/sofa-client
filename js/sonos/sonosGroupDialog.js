import React from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import Divider from '@material-ui/core/Divider';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';

import SpeakerIcon from '@material-ui/icons/Speaker';

import SofaDialog from '../sofaDialog';
import SonosGroup from './sonosGroup';


const styles = theme => ({
        
    list: {
        minWidth: 320,
    },
    content: {
        minWidth: 0,
        padding: "0 !important",
        flexGrow:1,
        display: "flex",
        alignItems: "center"
    },
    thermostatList: {
        width: "100%",
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

class SonosGroupDialog extends React.Component {
    
    handleCheckClick = (event, name, endpointId) => {
        if (event.target.checked) {
            var sonosinput=this.props.coordinator
        } else {
            var sonosinput=''
        }
        this.props.sendAlexaCommand(name, endpointId, 'InputController', "SelectInput", { "input": sonosinput } )
    }; 

    render() {
        
        const { classes, fullScreen, devices, coordinator, linked  } = this.props;
        
        return (
            <SofaDialog title={coordinator} open={this.props.open} close={this.props.close} >
                <DialogContent className={classes.dialogContent }>
                    <List className={classes.thermostatList} >
                        { devices.map(device => 
                            <SonosGroup key={device.endpointId} name={device.friendlyName} endpointId={device.endpointId} coordinator={coordinator} linked={linked} handleCheck={this.handleCheckClick} />
                        )}
                    </List>
                </DialogContent>
                <Divider />
                <DialogActions className={classes.dialogActions} >
                    <Button onClick={(e) => this.props.close(e)} color="primary" autoFocus>OK</Button>
                </DialogActions>
            </SofaDialog>
        )
    }

}

SonosGroupDialog.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SonosGroupDialog);
