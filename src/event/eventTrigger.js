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

import ShuffleIcon from '@material-ui/icons/Shuffle';
import CloseIcon from '@material-ui/icons/Close';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


import OperatorButton from "../automation/operatorButton"


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
    secondary: {
        padding: 16,
    },
    item: {
        padding: 16,
        backgroundColor: theme.palette.grey[200]
        },

});


class EventTrigger extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
            condition: {},
        }
    }

    editConditionValue = (value) => {
        var condition=this.props.condition
        condition.value=value
        this.saveCondition(condition)
    }
    
    editOperatorValue = (value) => {
        var condition=this.props.condition
        condition.operator=value
        this.saveCondition(condition)
    }
    
    saveCondition = (condition) => {
        this.props.save(this.props.index, condition)
    }
    
    render() {
        
        const { classes, index, name, trigger, propertyName} = this.props;
        
        return (
            <ListItem className={classes.item} >
                {this.props.edit ?
                <ListItemIcon onClick={() => this.props.delete(index)}><CloseIcon /></ListItemIcon>   
                :
                <ListItemIcon><ShuffleIcon /></ListItemIcon>
                }
                <ListItemText primary={name} secondary={trigger.controller} className={classes.deviceName}/>
                <OperatorButton index={index} value={"="} setOperator={ this.editOperatorValue }/>
                <TextField
                        className={classes.input}
                        id={'trigger'+index}
                        label={trigger.name}
                        margin="normal"
                        value={trigger.value}
                        onChange={(e) => this.editConditionValue(e.target.value)}
                />
            </ListItem>
        )
    }
}

EventTrigger.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EventTrigger);
