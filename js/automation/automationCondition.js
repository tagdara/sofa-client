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
    input: {
        marginTop:0,
        marginLeft: 16,
        flexGrow:1,
        flexBasis:0,
    },
    inputstring: {
        marginTop:0,
        marginLeft: 16,
        flexGrow:1,
        flexBasis:0,
    },
    inputdecimal: {
        marginTop:0,
        marginLeft: 16,
        width: 40,
        overflowX: "hidden",
    },
    inputpercentage: {
        marginTop:0,
        marginLeft: 16,
        width: 40,
        overflowX: "hidden",
    },
    inputinteger: {
        marginTop:0,
        marginLeft: 16,
        width: 40,
        overflowX: "hidden",
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
    },

});


class AutomationCondition extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
            parentField: "",
            fields: [],
            editVal: {},

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
    
    componentDidMount() {
        var subfields=[]
        var edval={}
        var parent=""

        for (var av in this.props.conditionProperties.value) {
            if (typeof this.props.actionValues[av] === 'object') {
                parent=av
                for (var avsub in this.props.actionValues[av]) {
                    //console.log(av,avsub,this.props.actionValues[av][avsub])
                    subfields.push({ 'name':avsub, 'type': this.props.actionValues[av][avsub] })
                    edval[avsub]=''
                    if (this.props.action.value.hasOwnProperty(av)) {
                        if (this.props.action.value[av].hasOwnProperty(avsub)) {
                            console.log(this.props.action.value[av][avsub])
                            edval[avsub]=this.props.action.value[av][avsub]
                        }
                    }
                }
            } else {
                console.log('not an object',this.props.actionValues[av])
                subfields= [{ "name":av, "type": this.props.actionValues[av] }]
                edval[av]=''
                if (this.props.action.value.hasOwnProperty(av)) {
                    edval[av]=this.props.action.value[av]
                }
            }
        }
        this.setState({fields: subfields, editVal:edval, parentField: parent})
    }
    
    editValue = (val) => {
        console.log('ev',val)
    }
    
    editValues = (conval, value) => {
        var edval=this.state.editVal
        edval[conval]=value     
        this.setState({editVal:edval}, () => this.editConditionValue(edval))
    }
    
    componentDidMount() {

        var subfields=[]
        var edval={}
        console.log('conprops',this.props.controllerProperties)
        for (var cp in this.props.controllerProperties) {
            //console.log(av,avsub,this.props.actionValues[av][avsub])
            subfields.push({ 'name':cp, 'type': this.props.controllerProperties[cp] })
            edval[cp]=''
            if (this.props.condition.value.hasOwnProperty(cp)) {
                edval[cp]=this.props.condition.value[cp]
            }
        }
        this.setState({ fields: subfields, editVal:edval })

    }
    
    typeFromType = (vartype) => {
        if (vartype=="time") {
            return "time"
        } else if  (vartype=="percentage") {
            return "number"
        } else if  (vartype=="integer") {
            return "number"
        } else {
            return "text"
        }
    }
    
    render() {
        
        const { classes, index, name, condition, propertyName} = this.props;
        const { editVal, fields } = this.state;
        
        return (
            <ListItem className={classes.conditionItem} >
                {this.props.edit ?
                <ListItemIcon onClick={() => this.props.delete(index)}><CloseIcon /></ListItemIcon>   
                :
                <ListItemIcon><ShuffleIcon /></ListItemIcon>
                }
                <ListItemText primary={name} secondary={condition.controller+" "+condition.propertyName} className={classes.deviceName}/>
                <OperatorButton index={index} value={condition.operator} setOperator={ this.editOperatorValue }/>
                { fields.map((conval,index) =>
                    <TextField
                        className={classes['input'+conval.type]}
                        id={'conval'+index}
                        label={conval.name}
                        margin="dense"
                        value={editVal[conval.name]}
                        onChange={(e) => this.editValues(conval.name, e.target.value)}
                        type={this.typeFromType(conval.type)}
                    />
                )}

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

AutomationCondition.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AutomationCondition);
