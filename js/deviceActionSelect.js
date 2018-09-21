import React from "react";
import List from '@material-ui/core/List';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import Slide from  '@material-ui/core/Slide';
import Checkbox from  '@material-ui/core/Checkbox';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import TuneIcon from '@material-ui/icons/Tune';


import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

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
    },
    listItem: {
        padding: 16,
        width: '100%',
    },
    dialogContent: {
        padding: 0,
    },
    sceneExpand: {
        padding: "0",
        marginBottom: 2,
    }

});

class DeviceActionSelect extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
            selectedDevices: this.props.selectedDevices,
        }
    }
    
    actionDevices(devices) {
        var actiondevices=[]
        for (var i = 0; i < devices.length; i++) {
            var dc=this.getControllers(devices[i])
            for (var j = 0; j < dc.length; j++) {
                var cc=this.getControllerCommands(dc[j])
                if (Object.keys(cc).length>0) {
                    actiondevices.push(devices[i])
                    break
                }
            }
        }
        return actiondevices
    }

    getControllers(device) {
        var caplist=[]
        for (var cap in device.capabilities) {
            var capi=device.capabilities[cap]['interface'].split(".")[1]
            if (this.getControllerCommands(capi)) {
                caplist.push(device.capabilities[cap]['interface'].split(".")[1])
            }
        }

        return caplist
        
    }
    
    getControllerCommands(controller) {
        var cmds=[]
        return this.props.controllers[controller]
    }

    render() {
        
        const { classes, fullScreen  } = this.props;
        
        return (
            <List className={classes.thermostatList} >
                    { 
                    this.actionDevices(this.props.devices).map((device) => (
                        <ExpansionPanel key={ device.endpointId+'-exp' } elevation={0} CollapseProps={{ unmountOnExit: true }}>
                            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} className={classes.summary} >
                                <ListItem className={classes.listItem} >
                                    <ListItemIcon><TuneIcon /></ListItemIcon>
                                    <ListItemText primary={device.friendlyName} secondary={device.displayCategories} />
                                </ListItem>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails className={classes.sceneExpand}>
                                <List>
                                { this.getControllers(device).map((controller) => {
                                    return Object.keys(this.getControllerCommands(controller)).map((cmd) => (
                                        <ListItem key={device.friendlyName+controller+cmd} className={classes.listItem} onClick={() => this.props.select(device.friendlyName, controller, cmd)}>
                                            <ListItemIcon><TuneIcon /></ListItemIcon>
                                            <ListItemText primary={cmd} secondary={controller} />
                                        </ListItem>
                                    ));
                                })}
                                </List>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                    ))}
            </List>
        )
    }

}

DeviceActionSelect.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DeviceActionSelect);
