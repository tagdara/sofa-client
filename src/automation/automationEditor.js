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
import AutomationTrigger from "./automationTrigger"

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
        height: "100%",
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
        bottom: theme.spacing.unit * 3,
        right: "50%",
    },
    editorTitle: {
        padding: "16 16 4 16",
    }
});

const dialActions = [
  { icon: <TuneIcon />, name: 'Action' },
  { icon: <ShuffleIcon />, name: 'Condition' },
  { icon: <AnnouncementIcon />, name: 'Trigger' },

];

class AutomationEditor extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
            addmode: null,
            actions: [],
            conditions: [],
            triggers: [],
            edit: false,
            open: false,
            hidden: false,
        }
    }

    editActionValue = (index, e) => {
        var actions=this.state.actions
        actions[index].value=e.target.value
        this.saveAction(index, action)
    }
    
    handleEditActions = () => {
        this.setState({edit: true, hidden: true})
    }  
    
    handleDoneAddEdit = () => {
        this.setState({addmode: false, edit: false, hidden: false})
    }  
    
    handleActionSelect = (deviceName, endpointId, controller, cmd) => {
        var actions=this.state.actions
        actions.push({'deviceName':deviceName, "endpointId":endpointId, "controller":controller, "command":cmd, "value":0})
        this.setState({actions : actions, addmode: false, hidden: false},
            () => this.saveAutomation()
        );
    }

    handlePropertySelect = (deviceName, endpointId, controller, prop) => {
        var conditions=this.state.conditions
        conditions.push({'deviceName':deviceName, "endpointId":endpointId, "controller":controller, "propertyName":prop, "operator": "=", "value":0})
        this.setState({conditions : conditions, addmode: false, hidden: false},
            () => this.saveAutomation()
        );
    }

    handleTriggerSelect = (deviceName, endpointId, controller, prop) => {
        var triggers=this.state.triggers
        triggers.push({'deviceName':deviceName, "endpointId":endpointId, "controller":controller, "propertyName":prop, "operator": "=", "value":0})
        this.setState({triggers : triggers, addmode: false, hidden: false},
            () => this.saveAutomation()
        );
    }

    getActionValues = (controller, command) => {

        return this.props.directives[controller][command]

    }

    getControllerProperties = (controller, prop) => {

        return this.props.controllerProperties[controller][prop]

    }

    
    getActionValue = (controller, command) => {

        var payload=this.props.directives[controller][command]
        for (var prop in payload) {
            if (payload[prop].hasOwnProperty('value')) {
                return prop
            }
        } 
        return ''
    }
    
    deleteTrigger = (index) => {
        var triggers=this.state.triggers
        triggers.splice(index, 1);
        this.setState({triggers : triggers},
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
    
    deleteAction = (index) => {
        var actions=this.state.actions
        actions.splice(index, 1);
        this.setState({actions : actions},
            () => this.saveAutomation()
        );
    }
    
    moveTriggerUp = (index) => {
        if (index-1>=0) {
            var triggers=this.state.triggers
            var element = triggers[index];
            triggers.splice(index, 1);
            triggers.splice(index-1, 0, element);
            this.setState({triggers : triggers},
                () => this.saveAutomation()
            );
        }
    }

    moveTriggerDown = (index) => {
        if (index+1<=this.state.triggers.length) {
            var triggers=this.state.triggers
            var element = triggers[index];
            triggers.splice(index, 1);
            triggers.splice(index+1, 0, element);
            this.setState({triggers : triggers},
                () => this.saveAutomation()
            );
        }
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

    saveTrigger = (index, trigger) => {
        var triggers=this.state.triggers
        triggers[index]=trigger
        this.setState({triggers : triggers},
            () => this.saveAutomation()
        );
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
                body: JSON.stringify({"conditions": this.state.conditions, "actions": this.state.actions, "triggers": this.state.triggers})
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
        if (automation.hasOwnProperty('triggers')) {
            this.setState({ triggers:automation['triggers']})
        } else {
            this.setState({ triggerss : [] });
        }


    }
    
    componentDidMount() {
  	    fetch('/list/logic/automation/'+this.props.name)
 		    .then(result=>result.json())
            .then(result=>this.loadAutomation(result));

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
        this.setState({ open: false, addmode: addtype, hidden: true, edit: false})
    }
    
    renderSelect(param) {
        switch(this.state.addmode) {
            case 'Action':
                return <DeviceSelect mode={"action"} select={this.handleActionSelect} />
            case 'Condition':
                return <DeviceSelect mode={"property"} select={this.handlePropertySelect} />
            case 'Trigger':
                return <DeviceSelect mode={"property"} select={this.handleTriggerSelect} />

            default:
                return null;
        }
    }
    
    render() {
        
        const { classes, name } = this.props;
        const { open, hidden, edit, addmode, conditions, triggers, actions } = this.state;
        
        return (
            <React.Fragment>
                <DialogTitle className={classes.editorTitle}>
                    {name}
                    {addmode ? " / Add "+ addmode : null}
                </DialogTitle>
                <DialogContent className={classes.dialogContent }>
                { addmode ? 
                    this.renderSelect()
                :  
                    <React.Fragment>
                    { triggers.length > 0 &&
                    <List className={classes.listActions}>
                        <Divider />
                        <ListSubheader>Triggers</ListSubheader>
                        { triggers.map((trigger,index) =>
                            <AutomationTrigger moveUp={this.moveTriggerUp} moveDown={this.moveTriggerDown} save={this.saveTrigger} edit={edit} delete={this.deleteTrigger} trigger={trigger} index={index} name={this.props.deviceByEndpointId(trigger.endpointId).friendlyName} key={ name+index } />
                        )}
                    </List> }
                    { conditions.length > 0 &&
                    <List className={classes.listActions}>
                        <Divider />
                        <ListSubheader>Conditions</ListSubheader>
                        { conditions.map((condition,index) =>
                            <AutomationCondition controllerProperties={this.getControllerProperties(condition.controller, condition.propertyName)} moveUp={this.moveConditionUp} moveDown={this.moveConditionDown} save={this.saveCondition} edit={edit} delete={this.deleteCondition} condition={condition} index={index} name={this.props.deviceByEndpointId(condition.endpointId).friendlyName} key={ name+index } />
                        )}
                    </List> }
                    { actions.length > 0 &&
                    <List className={classes.listActions}>
                        <Divider />
                        <ListSubheader>Actions</ListSubheader>
                        { actions.map((action,index) =>
                            <AutomationAction moveUp={this.moveActionUp} moveDown={this.moveActionDown} save={this.saveAction} edit={edit} action={action} delete={this.deleteAction} actionValues={this.getActionValues(action.controller, action.command)} actionValue={this.getActionValue(action.controller, action.command)} index={index} device={ this.props.deviceByEndpointId(action.endpointId) } name={this.props.deviceByEndpointId(action.endpointId).friendlyName} key={ name+index } />
                        )}
                    </List>
                    }
                    </React.Fragment>
                }
                </DialogContent>
                <Divider />
                {!addmode && !edit ?
                    <DialogActions className={classes.dialogActions} >
                        <Button onClick={() => this.handleEditActions()} color="primary">EDIT</Button>
                        <Button onClick={() => this.props.doneEditing()} color="primary" autoFocus>OK</Button>
                    </DialogActions>
                : 
                    <DialogActions className={classes.dialogActions} >
                        <Button onClick={() => this.handleDoneAddEdit()} color="primary" autoFocus>DONE</Button>
                    </DialogActions>
                }
                    <SpeedDial className={classes.speedDial} hidden={hidden} icon={<SpeedDialIcon openIcon={<EditIcon />} />} onBlur={this.handleClose}
                                onClick={this.handleClick} onClose={this.handleClose} onFocus={this.handleOpen} onMouseEnter={this.handleOpen}
                                onMouseLeave={this.handleClose} open={open} ariaLabel="Add">
                            {dialActions.map(dialAction => (
                                <SpeedDialAction key={dialAction.name} icon={dialAction.icon} tooltipTitle={dialAction.name} onClick={() => this.handleDialClick(dialAction.name)} />
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
