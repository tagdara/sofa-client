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
    conditionItem: {
        padding: 16,
        backgroundColor: theme.palette.grey[200]
        },

});


class AutomationTrigger extends React.Component {
    
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
        
        const { classes, index, name, condition, propertyName} = this.props;
        
        return (
            <ListItem className={classes.conditionItem} >
                {this.props.edit ?
                <ListItemIcon onClick={() => this.props.delete(index)}><CloseIcon /></ListItemIcon>   
                :
                <ListItemIcon><ShuffleIcon /></ListItemIcon>
                }
                <ListItemText primary={name} secondary={condition.controller} className={classes.deviceName}/>
                <OperatorButton index={index} value={condition.operator} setOperator={ this.editOperatorValue }/>
                <TextField
                        className={classes.input}
                        id={'condition'+index}
                        label={propertyName}
                        margin="normal"
                        value={condition.value}
                        onChange={(e) => this.editConditionValue(e.target.value)}
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
