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
            addingAction: false,
            addingScene: false,
            editingActions: false,
            adding: false,
        }
    }

    editActionValue = (index, e) => {
        var actions=this.props.actions
        actions[index].value=e.target.value
        this.props.save(this.props.name, actions)
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
        var actions=this.props.actions
        actions.push({'deviceName':deviceName, "endpointId":endpointId, "controller":controller, "command":cmd, "value":0})
        this.props.save(this.props.name, actions)
        this.setState({addingAction: false, editingActions: false, addingScene: false})
    }

    
    getActionValue = (controller, command) => {
        if (controller=='SofaSceneController') {
            return ''
        }
        var payload=this.props.controllers[controller][command]
        for (var prop in payload) {
            if (payload[prop]=='value') {
                return prop
            }
        } 
        return ''
    }
    
    deleteAction = (index) => {
        var actions=this.props.actions
        actions.splice(index, 1);
        this.props.save(this.props.name, actions)
    }

    moveUp = (index) => {
        if (index-1>=0) {
            var actions=this.props.actions
            var element = actions[index];
            actions.splice(index, 1);
            actions.splice(index-1, 0, element);
            this.props.save(this.props.name, actions)
        }
    }

    moveDown = (index) => {
        if (index+1<=this.props.actions.length) {
            var actions=this.props.actions
            var element = actions[index];
            actions.splice(index, 1);
            actions.splice(index+1, 0, element);
            this.props.save(this.props.name, actions)
        }
    }
    
    runAction = (name,index) => {
        var action=this.props.actions[index]
        console.log('actions',this.props.actions[index], this.props.actions[index]['value'])
        this.props.sendAlexaCommand(this.props.actions[index].deviceName, '', this.props.actions[index].controller, this.props.actions[index].command, this.props.actions[index]['value'])
    }
    
    deviceByName = devname => {
        
        for (var i = 0; i < this.props.devices.length; i++) {
            if (this.props.devices[i].friendlyName==devname) {
                return this.props.devices[i]
            }
        }
    }
    
    componentDidMount() {
        var fixed=false
        var actions=this.props.actions
        console.log('Checking actions for endpoint IDs:', this.props.actions)
        for (var i = 0; i < this.props.actions.length; i++) {
            if (actions[i].hasOwnProperty('endpointId')) {
                if (actions[i]['endpointId']=='') {
                    actions[i]['endpointId']=this.deviceByName(actions[i]['deviceName'])['endpointId']
                    console.log('Added missing endpoint ID for ', actions[i]['deviceName'],actions[i]['endpointId'])
                    fixed=true
                }
            } else {
                if (actions[i]['controller']=='SofaSceneController') {
                    var fb={}
                    fb['controller']='SceneController'
                    fb['deviceName']=actions[i]['deviceName']+" "+actions[i]['command']
                    fb['command']='Activate'
                    fb['value']=0
                    actions[i]=fb
                }
                console.log('Trying to make sure correct:', actions[i])
                actions[i]['endpointId']=this.deviceByName(actions[i]['deviceName'])['endpointId']
                console.log('Added missing endpoint ID for ', actions[i]['deviceName'],actions[i]['endpointId'])
                fixed=true
            }
        }
            
        if (fixed) {
            this.props.save(this.props.name, actions)
        }
    }
    
    render() {
        
        const { classes } = this.props;
        
        return (
            <React.Fragment>
                <DialogContent className={classes.dialogContent }>
                { this.state.addingAction ?
                    <DeviceActionSelect select={this.handleActionSelect} devices={this.props.devices} controllers={this.props.controllers} />
                : null }
                { this.state.addingScene ?
                    <SceneActionSelect select={this.handleActionSelect} sceneData={this.props.sceneData} />
                : null }
                { (this.state.addingAction || this.state.addingScene) ?
                    null : 
                    <List className={classes.listActions}>
                        {this.props.actions.map((action,index) =>
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
                    <Button onClick={() => this.handleAddSceneAction()} color="primary" autoFocus>ADD SCENE</Button>
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
