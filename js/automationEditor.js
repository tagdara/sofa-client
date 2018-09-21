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

import Slide from  '@material-ui/core/Slide';
import Checkbox from  '@material-ui/core/Checkbox';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import TuneIcon from '@material-ui/icons/Tune';
import EditIcon from '@material-ui/icons/Edit';
import PlaceIcon from '@material-ui/icons/Place';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';

import TextField from '@material-ui/core/TextField';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';

import DeviceActionSelect from "./deviceActionSelect"

const styles = theme => ({
        
    content: {
        minWidth: 0,
        padding: "0 !important",
        flexGrow:1,
        display: "flex",
        alignItems: "center"
    },
    list: {
        minWidth: 320,
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
    },
    dialogContent: {
        padding: 0,
    },
    sceneExpand: {
        padding: "0",
        marginBottom: 2,
    },
    areaInput: {
        marginTop:0,
        marginLeft: 16,
        maxWidth: "25%",
    },
    deviceName: {
        padding: 0,
    }

});

function Transition(props) {
  return <Slide direction="up" {...props} />;
}


class AutomationEditor extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
            adding: false,
            selectedName: '',
            selectedDevices: [],
            areamap: {},
            automations: {},
            roomBrowser: false,
            objectBrowser: false,
            newAutomationName: '',
            actions:[],
            delSelect: false,
        }
    }

    updateList = (regionname, roomlist) => {
        var curmap=this.state.automations
        curmap[regionname]['rooms']=roomlist
        this.setState({automations:curmap})
    }
    
    editNewAutomationName = (e) => {
        this.setState({ newAutomationName: e.target.value })
    }

    editActionValue = (index, e) => {
        var actions=this.props.actions
        actions[index].value=e.target.value
        this.props.save(this.props.name, actions)
    }

    
    handleAdd = (add) => {
        
        if (this.state.automations.hasOwnProperty(this.state.newAutomationName)) {
            console.log('That region already exists')
        } else {
            var curmap=this.state.automations;
            curmap[this.state.newAutomationName]={'rooms': []}
            this.setState({ automations: curmap, newAutomationName: '' },
                () => this.saveAutomations()
            );
        }

    }
    
    handleDelete = (delarea) => {
        var curmap=this.state.automations;
        delete curmap[delarea]
        this.setState({automations: curmap},
                () => this.saveAutomations()
        );
    }
    
    handleSelect = (region) => {
        if (!this.props.editMode) {
            this.props.handleSelect(region)
        }
    }
    
    handleActionSelect = (deviceName, controller, cmd) => {
        console.log(deviceName, controller, cmd)
        var actions=this.props.actions
        actions.push({'deviceName':deviceName, "controller":controller, "command":cmd, "value":0})
        this.props.save(this.props.name, actions)
    }
    
    getActionValue = (controller, command) => {
        
        var payload=this.props.controllers[controller][command]
        for (var prop in payload) {
            if (payload[prop]=='value') {
                return prop
            }
        } 
        return ''
    }
    
    runAction = (name,index) => {
        
        var action=this.props.actions[index]
        console.log('actions',this.props.actions[index], this.props.actions[index]['value'])
        this.props.sendAlexaCommand(this.props.actions[index].deviceName, '', this.props.actions[index].controller, this.props.actions[index].command, this.props.actions[index]['value'])
    }
    
    render() {
        
        const { classes } = this.props;
        
        return (
            <DialogContent className={classes.dialogContent }>
                { this.props.editMode ?
                    <DeviceActionSelect select={this.handleActionSelect} devices={this.props.devices} controllers={this.props.controllers} />
                :null}

                { !this.props.editMode ?
                <List className={classes.List} >
                    { this.props.actions.map((action,index) => 
                        <ListItem className={classes.listItem} key={ action.deviceName+action.command } >
                            <ListItemIcon onClick={() => this.runAction(name,index)}><TuneIcon /></ListItemIcon>
                            <ListItemText primary={action.deviceName} secondary={action.command} className={classes.deviceName}/>
                                {this.getActionValue(action.controller, action.command) ?
                                <TextField
                                    className={classes.areaInput}
                                    id={'action'+index}
                                    label={this.getActionValue(action.controller, action.command)}
                                    margin="normal"
                                    value={action.value}
                                    onChange={(e) => this.editActionValue(index,e)}
                                />
                                : null }
                            <ListItemSecondaryAction className={classes.listItem}>
                                { this.state.delSelect ?
                                <IconButton aria-label="Close" onClick={() => this.handleDelete(name)}>
                                    <CloseIcon />
                                </IconButton>
                                : null }

                            </ListItemSecondaryAction>
                        </ListItem>
                    )}
                </List>
                :null
                }
            </DialogContent>
        )
    }
}

AutomationEditor.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AutomationEditor);
