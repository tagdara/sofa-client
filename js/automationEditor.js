import React from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import TextField from '@material-ui/core/TextField';

import TuneIcon from '@material-ui/icons/Tune';
import EditIcon from '@material-ui/icons/Edit';
import PlaceIcon from '@material-ui/icons/Place';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import DeviceActionSelect from "./deviceActionSelect"
import SceneActionSelect from "./sceneActionSelect"

const styles = theme => ({
        
    areaInput: {
        marginTop:0,
        marginLeft: 16,
        maxWidth: "25%",
    },
    deviceName: {
        padding: 0,
    },
    dialogActions: {
        paddingBottom: "env(safe-area-inset-bottom)",
    },
    dialogContent: {
        padding: 0,
    },
    listActions: {
        minWidth: 320,
        width: "100%",
    },
    listItem: {
        padding: 16,
    },

});

class AutomationEditor extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
            actions: [],
            addingAction: false,
            addingScene: false,
            editingActions: false,
            adding: false,
        }
    }

    editActionValue = (index, e) => {
        var actions=this.state.actions
        actions[index].value=e.target.value
        this.saveAutomationActions(actions)
    }

    handleAddAction = () => {
        this.setState({addingAction: true})
    }  
    
    handleAddSceneAction = () => {
        this.setState({addingScene: true})
    }  

    handleEditActions = () => {
        this.setState({editingActions: true})
    }  
    
    handleDoneAddEdit = () => {
        this.setState({addingAction: false, editingActions: false, addingScene: false})
    }  
    
    handleActionSelect = (deviceName, endpointId, controller, cmd) => {
        console.log(deviceName, endpointId, controller, cmd)
        var actions=this.state.actions
        actions.push({'deviceName':deviceName, "endpointId":endpointId, "controller":controller, "command":cmd, "value":0})
        this.saveAutomationActions(actions)
        this.setState({addingAction: false, editingActions: false, addingScene: false})
    }

    
    getActionValue = (controller, command) => {
        console.log(controller, command, this.props.controllers)

        var payload=this.state.controllers[controller][command]
        for (var prop in payload) {
            if (payload[prop]=='value') {
                return prop
            }
        } 
        return ''
    }
    
    deleteAction = (index) => {
        var actions=this.state.actions
        actions.splice(index, 1);
        this.saveAutomationActions(actions)
    }

    moveUp = (index) => {
        if (index-1>=0) {
            var actions=this.state.actions
            var element = actions[index];
            actions.splice(index, 1);
            actions.splice(index-1, 0, element);
            this.saveAutomationActions(actions)
        }
    }

    moveDown = (index) => {
        if (index+1<=this.state.actions.length) {
            var actions=this.state.actions
            var element = actions[index];
            actions.splice(index, 1);
            actions.splice(index+1, 0, element);
            this.saveAutomationActions(actions)
        }
    }
    
    runAction = (name,index) => {
        var action=this.state.actions[index]
        console.log('actions',action, action['value'])
        this.props.sendAlexaCommand(action.deviceName, '', action.controller, action.command, action['value'])
    }
    
    deviceByName = devname => {
        
        for (var i = 0; i < this.props.devices.length; i++) {
            if (this.props.devices[i].friendlyName==devname) {
                return this.props.devices[i]
            }
        }
    }
    
    saveAutomationActions = (actions) => {
        
        fetch('/save/logic/automation/'+this.props.name, {
                method: 'post',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(actions)
            })
            .then(res=>console.log(res))
            .then(this.setState({actions:actions}))
    } 
    
    componentDidMount() {
  	    fetch('/list/logic/automation/'+this.props.name)
 		    .then(result=>result.json())
            .then(result=>this.setState({actions:result['actions']}));

  	    fetch('/controllercommands')
 		    .then(result=>result.json())
            .then(result=>this.setState({controllers:result}));

  	    fetch('/config/areamap')
 		    .then(result=>result.json())
            .then(result=>this.setState({areamap:result}));

  	    fetch('/config/scenemap')
 		    .then(result=>result.json())
            .then(data=>this.setState({sceneData: data}));

    }

    
    render() {
        
        const { classes } = this.props;
        
        return (
            <React.Fragment>
                <DialogContent className={classes.dialogContent }>
                { this.state.addingAction ?
                    <DeviceActionSelect select={this.handleActionSelect} devices={this.props.devices} controllers={this.state.controllers} />
                :  
                    <List className={classes.listActions}>
                        {this.state.actions.map((action,index) =>
                        <ListItem className={classes.listItem} key={ this.props.name+index } >
                            {this.state.editingActions ?
                            <ListItemIcon onClick={() => this.deleteAction(index)}><CloseIcon /></ListItemIcon>   
                            :
                            <ListItemIcon onClick={() => this.runAction(name,index)}><TuneIcon /></ListItemIcon>
                            }
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
                            {this.state.editingActions ?
                                <ListItemSecondaryAction className={classes.listItem}>
                                    <IconButton onClick={() => this.moveUp(index)}><ExpandLessIcon /></IconButton>   
                                    <IconButton onClick={() => this.moveDown(index)}><ExpandMoreIcon /></IconButton>
                                </ListItemSecondaryAction>
                            : null }
                        </ListItem>
                        )}
                    </List>
                }
                </DialogContent>
                <Divider />
            {!this.state.addingAction && !this.state.editingActions ?
                <DialogActions className={classes.dialogActions} >
                    <Button onClick={() => this.handleEditActions()} color="primary" autoFocus>EDIT</Button>
                    <Button onClick={() => this.handleAddAction()} color="primary" autoFocus>ADD</Button>
                    <Button onClick={() => this.props.doneEditing()} color="primary" autoFocus>DONE</Button>
                </DialogActions>
            : null }
            {this.state.editingActions ?
                <DialogActions className={classes.dialogActions} >
                    <Button onClick={() => this.handleDoneAddEdit()} color="primary" autoFocus>DONE</Button>
                </DialogActions>
            : null }
            {this.state.addingAction ?
                <DialogActions className={classes.dialogActions} >
                    <Button onClick={() => this.handleDoneAddEdit()} color="primary" autoFocus>CANCEL</Button>
                </DialogActions>
            : null }
            </React.Fragment>
        )
    }
}

AutomationEditor.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AutomationEditor);
