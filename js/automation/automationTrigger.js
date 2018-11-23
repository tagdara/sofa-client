import React from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import TextField from '@material-ui/core/TextField';

import AnnouncementIcon from '@material-ui/icons/Announcement';
import CloseIcon from '@material-ui/icons/Close';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


import OperatorButton from "./operatorButton"


const styles = theme => ({
        
    input: {
        marginTop:0,
        marginLeft: 16,
        flexGrow:1,
        flexBasis:0,
    },
    deviceName: {
        padding: 0,
        flexGrow:1,
        flexBasis:0,
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
    triggerItem: {
        padding: 16,
        },

});


class AutomationTrigger extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
            trigger: {},
        }
    }

    editTriggerValue = (value) => {
        var trigger=this.props.trigger
        trigger.value=value
        this.saveTrigger(trigger)
    }
    
    editOperatorValue = (value) => {
        var trigger=this.props.trigger
        trigger.operator=value
        this.saveTrigger(trigger)
    }
    
    saveTrigger = (trigger) => {
        this.props.save(this.props.index, trigger)
    }
    
    render() {
        
        const { classes, index, name, trigger, propertyName} = this.props;
        
        return (
            <ListItem className={classes.triggerItem} >
                {this.props.edit ?
                <ListItemIcon onClick={() => this.props.delete(index)}><CloseIcon /></ListItemIcon>   
                :
                <ListItemIcon><AnnouncementIcon /></ListItemIcon>
                }
                <ListItemText primary={name} secondary={trigger.controller} className={classes.deviceName}/>
                <OperatorButton index={index} value={trigger.operator} setOperator={ this.editOperatorValue }/>
                <TextField
                        className={classes.input}
                        id={'trigger'+index}
                        label={propertyName}
                        margin="normal"
                        value={trigger.value}
                        onChange={(e) => this.editTriggerValue(e.target.value)}
                />
                {this.props.edit ?
                    <ListItemSecondaryAction className={classes.listItem}>
                        <IconButton onClick={() => this.props.moveUp(index)}><ExpandLessIcon /></IconButton>   
                        <IconButton onClick={() => this.props.moveDown(index)}><ExpandMoreIcon /></IconButton>
                    </ListItemSecondaryAction>
                : null }
            </ListItem>
        )
    }
}

AutomationTrigger.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AutomationTrigger);
