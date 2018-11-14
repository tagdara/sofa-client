import React from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { withData } from '../DataContext/withData';

import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';

import DeviceSelect from "../deviceSelect/deviceSelect"

import AutomationAction from "./automationAction"
import AutomationCondition from "./automationCondition"
import OperatorButton from "./operatorButton"

import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import FileCopyIcon from '@material-ui/icons/FileCopyOutlined';
import SaveIcon from '@material-ui/icons/Save';
import PrintIcon from '@material-ui/icons/Print';
import ShareIcon from '@material-ui/icons/Share';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

import AnnouncementIcon from '@material-ui/icons/Announcement';
import ShuffleIcon from '@material-ui/icons/Shuffle';
import TuneIcon from '@material-ui/icons/Tune';

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
        backgroundColor: theme.palette.background.paper,
    },
    listItem: {
        padding: 16,
    },
    conditionItem: {
        padding: 16,
        backgroundColor: theme.palette.grey[200]
    },
    speedDial: {
        position: 'absolute',
        bottom: theme.spacing.unit * 4,
        right: theme.spacing.unit * 6,
    },
    editorTitle: {
        padding: "16 16 4 16",
    }
});

const actions = [
  { icon: <TuneIcon />, name: 'Action' },
  { icon: <ShuffleIcon />, name: 'Condition' },
  { icon: <AnnouncementIcon />, name: 'Trigger' },

];

class AutomationEditor extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
            actions: [],
            conditions: [],
            addingAction: false,
            addingCondition: false,

            editingActions: false,
            adding: false,
            
            open: false,
            hidden: false,
        }
    }

    editActionValue = (index, e) => {
        var actions=this.state.actions
        actions[index].value=e.target.value
        this.saveAction(index, action)
    }
    
    handleAddAction = () => {
        this.setState({addingAction: true, hidden: true})
    }  
    
    handleAddCondition = () => {
        this.setState({addingCondition: true, hidden: true})
    }  

    handleEditActions = () => {
        this.setState({editingActions: true, hidden: true})
    }  
    
    handleDoneAddEdit = () => {
        this.setState({addingAction: false, editingActions: false, addingCondition: false, hidden: false})
    }  
    
    handleActionSelect = (deviceName, endpointId, controller, cmd) => {
        var actions=this.state.actions
        actions.push({'deviceName':deviceName, "endpointId":endpointId, "controller":controller, "command":cmd, "value":0})
        this.setState({actions : actions},
            () => this.saveAutomation()
        );
        this.setState({addingAction: false, editingActions: false, addingCondition: false})
    }

    handlePropertySelect = (deviceName, endpointId, controller, prop) => {
        var conditions=this.state.conditions
        conditions.push({'deviceName':deviceName, "endpointId":endpointId, "controller":controller, "propertyName":prop, "operator": "=", "value":0})
        this.setState({conditions : conditions},
            () => this.saveAutomation()
        );
        this.setState({addingAction: false, editingActions: false, addingCondition: false})
    }

    
    getActionValue = (controller, command) => {

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
        this.setState({actions : actions},
            () => this.saveAutomation()
        );
    }
    
    deleteCondition = (index) => {
        var conditions=this.state.conditions
        conditions.splice(index, 1);
        this.setState({conditions : conditions},
            () => this.saveAutomation()
        );
    }
    
    moveConditionUp = (index) => {
        if (index-1>=0) {
            var conditions=this.state.conditions
            var element = conditions[index];
            conditions.splice(index, 1);
            conditions.splice(index-1, 0, element);
            this.setState({conditions : conditions},
                () => this.saveAutomation()
            );
        }
    }

    moveConditionDown = (index) => {
        if (index+1<=this.state.conditions.length) {
            var conditions=this.state.conditions
            var element = conditions[index];
            conditions.splice(index, 1);
            conditions.splice(index+1, 0, element);
            this.setState({conditions : conditions},
                () => this.saveAutomation()
            );
        }
    }

    
    moveActionUp = (index) => {
        if (index-1>=0) {
            var actions=this.state.actions
            var element = actions[index];
            actions.splice(index, 1);
            actions.splice(index-1, 0, element);
            this.setState({actions : actions},
                () => this.saveAutomation()
            );
        }
    }

    moveActionDown = (index) => {
        if (index+1<=this.state.actions.length) {
            var actions=this.state.actions
            var element = actions[index];
            actions.splice(index, 1);
            actions.splice(index+1, 0, element);
            this.setState({actions : actions},
                () => this.saveAutomation()
            );
        }
    }
    
    runAction = (name,index) => {
        var action=this.state.actions[index]
        this.props.sendAlexaCommand(action.deviceName, action.endpointId, action.controller, action.command, action['value'])
    }
    
    saveCondition = (index, condition) => {
        var conditions=this.state.conditions
        conditions[index]=condition
        this.setState({conditions : conditions},
            () => this.saveAutomation()
        );
    }

    saveAction = (index, action) => {
        var actions=this.state.actions
        actions[index]=action
        this.setState({actions : actions},
            () => this.saveAutomation()
        );
    }

    saveAutomation = () => {
        
        fetch('/save/logic/automation/'+this.props.name, {
                method: 'post',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({"conditions": this.state.conditions, "actions": this.state.actions})
            });
    } 

    loadAutomation = (automation) => {
        
        if (automation.hasOwnProperty('actions')) {
            this.setState({actions:automation['actions']})
        } else {
            this.setState({ actions : [] });
        }
        
        if (automation.hasOwnProperty('conditions')) {
            this.setState({conditions:automation['conditions']})
        } else {
            this.setState({ conditions : [] });
        }
    }
    
    componentDidMount() {
  	    fetch('/list/logic/automation/'+this.props.name)
 		    .then(result=>result.json())
            .then(result=>this.loadAutomation(result));

  	    fetch('/controllercommands')
 		    .then(result=>result.json())
            .then(result=>this.setState({controllers:result}));
    }
    
    handleVisibility = () => {
        this.setState(state => ({ open: false, hidden: !state.hidden,}));
    };

    handleClick = () => { 
        this.setState(state => ({open: !state.open,}));
    };

    handleOpen = () => {
        if (!this.state.hidden) { 
            this.setState({open: true,});
        }
    };

    handleClose = () => { 
        this.setState({open: false,});
    };
    
    handleDialClick = (addtype) => {
        this.setState({ open: false })
        if (addtype=="Trigger") {
            console.log('not implementted')
        } else if (addtype=="Condition") {
            this.handleAddCondition()
        } else if (addtype=="Action") {
            this.handleAddAction()
        }
    }
    
    render() {
        
        const { classes, name } = this.props;
        const { open, hidden, addingAction, addingCondition, conditions } = this.state;
        
        return (
            <React.Fragment>
                <DialogTitle className={classes.editorTitle}>
                    {name}
                    {addingCondition ? " / Add Condition" : null}
                    {addingAction ? " / Add Action" : null}
                </DialogTitle>
                <DialogContent className={classes.dialogContent }>
                { this.state.addingAction || this.state.addingCondition ?
                    <DeviceSelect mode={this.state.addingAction ? "action" : "property"} select={this.handleActionSelect} />
                :  
                    <React.Fragment>
                    { conditions.length > 0 ?
                    <List className={classes.listActions}>
                        <ListSubheader>Conditions</ListSubheader>
                        { conditions.map((condition,index) =>
                            <AutomationCondition moveUp={this.moveConditionUp} moveDown={this.moveConditionDown} save={this.saveCondition} edit={this.state.editingActions} delete={this.deleteCondition} condition={condition} index={index} name={this.props.deviceByEndpointId(condition.endpointId).friendlyName} key={ this.props.name+index } />
                        )}
                    </List>
                    : null }
                    <List className={classes.listActions}>
                        <ListSubheader>Actions</ListSubheader>
                        <Divider />
                        {this.state.actions.map((action,index) =>
                            <AutomationAction moveUp={this.moveActionUp} moveDown={this.moveActionDown} save={this.saveAction} edit={this.state.editingActions} action={action} delete={this.deleteAction} actionValue={this.getActionValue(action.controller, action.command)} index={index} device={ this.props.deviceByEndpointId(action.endpointId) } name={this.props.deviceByEndpointId(action.endpointId).friendlyName} key={ this.props.name+index } />
                        )}
                    </List>
                    </React.Fragment>
                }
                </DialogContent>
                <Divider />
            {!addingAction && !this.state.editingActions && !addingCondition ?
                <DialogActions className={classes.dialogActions} >
                    <Button onClick={() => this.handleEditActions()} color="primary">EDIT</Button>
                    <Button onClick={() => this.props.doneEditing()} color="primary" autoFocus>OK</Button>
                </DialogActions>
            : null }
            {this.state.editingActions || addingAction || addingCondition ?
                <DialogActions className={classes.dialogActions} >
                    <Button onClick={() => this.handleDoneAddEdit()} color="primary" autoFocus>DONE</Button>
                </DialogActions>
            : null }
                    <SpeedDial className={classes.speedDial} hidden={hidden} icon={<SpeedDialIcon openIcon={<EditIcon />} />} onBlur={this.handleClose}
                                onClick={this.handleClick} onClose={this.handleClose} onFocus={this.handleOpen} onMouseEnter={this.handleOpen}
                                onMouseLeave={this.handleClose} open={open} ariaLabel="Add">
                            {actions.map(action => (
                                <SpeedDialAction key={action.name} icon={action.icon} tooltipTitle={action.name} onClick={() => this.handleDialClick(action.name)} />
                            ))}
                    </SpeedDial>

            </React.Fragment>
        )
    }
}

AutomationEditor.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withData(withStyles(styles)(AutomationEditor));
