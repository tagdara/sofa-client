import React from 'react';
import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';

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

import DeviceIcon from '../DeviceIcon';
import GridItem from '../GridItem';
import OperatorButton from "./operatorButton"


const useStyles = makeStyles({
        
    input: {
        marginTop:0,
        marginLeft: 8,
        flexGrow:1,
        flexBasis:0,
    },
    inputstring: {
        marginTop:0,
        marginLeft: 8,
        flexGrow:1,
        flexBasis:0,
    },
    inputtime: {
        marginTop:0,
        marginLeft: 8,
        flexGrow:1,
        flexBasis:0,
    },
    inputdecimal: {
        marginTop:0,
        marginLeft: 8,
        width: 40,
        overflowX: "hidden",
    },
    inputpercentage: {
        marginTop:0,
        marginLeft: 8,
        width: 40,
        overflowX: "hidden",
    },
    inputinteger: {
        marginTop:0,
        marginLeft: 8,
        width: 40,
        overflowX: "hidden",
    },
    opbutton: {
        marginRight: 8,
    },
    deviceName: {
        flexGrow:1,
        flexBasis:0,
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
        padding: "12 16",
    },
    reducedButtonPad: {
        padding: "4 16 12 10",
        alignItems: "flex-end",
    }
});


export default function AutomationCondition(props) {

    const classes = useStyles();
    const [parentField, setParentField] = useState({})
    const [fields, setFields] = useState([])
    const [editVal, setEditVal] = useState({})
    const [condition, setCondition] = useState({})

    useEffect(() => {
        parseControllerProperties()
    }, []);
    
    function getIcon(category, size='default') {

        if (icons.hasOwnProperty(category)) {
            var RealIcon=icons[category]
        } else {
            var RealIcon=DeveloperBoardIcon
        }
        return <RealIcon size={24} fontSize={size} />
    }

    function editConditionValue(value) {
        var condition=props.item
        condition.value=value
        props.save(props.index, condition)
    }
    
    function editOperatorValue(value) {
        var condition=props.item
        condition.operator=value
        props.save(props.index, condition)
    }

    function editValue(val) {
        console.log('ev',val)
    }
    
    function editValues(conval, value) {
        var edval=editVal
        edval[conval]=value     
        setEditVal(edval)
        editConditionValue(edval)
    }
    
    function parseControllerProperties() {

        var subfields=[]
        var edval={}
        for (var cp in props.controllerProperties) {
            //console.log(av,avsub,props.actionValues[av][avsub])
            //console.log(props.controllerProperties[cp])
            subfields.push({ 'name':cp, 'type': props.controllerProperties[cp] })
            edval[cp]=''
            if (props.item.hasOwnProperty('value') && props.item.value.hasOwnProperty(cp)) {
                edval[cp]=props.item.value[cp]
            }
        }
        setFields(subfields)
        setEditVal(edval)
        
    }
    
    function typeFromType(vartype) {
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
    
    return (
        <GridItem wide={props.wide} nopad={true}>
        <ListItem className={classes.listItem} >
            <ListItemIcon><DeviceIcon name={props.device.displayCategories[0]} /></ListItemIcon>
            <ListItemText primary={props.name} secondary={props.item.controller+" "+props.item.propertyName} className={classes.deviceName}/>
            { props.remove ?
                <ListItemSecondaryAction>
                    <IconButton onClick={() => props.delete(props.index)}><CloseIcon /></IconButton>     
                </ListItemSecondaryAction>
                : null
            }
            { props.reorder &&
                <ListItemSecondaryAction>
                    <IconButton onClick={() => props.moveUp(props.index)}><ExpandLessIcon /></IconButton>   
                    <IconButton onClick={() => props.moveDown(props.index)}><ExpandMoreIcon /></IconButton>
                </ListItemSecondaryAction>
            }
        </ListItem>
        <ListItem className={classes.reducedButtonPad} >
            <OperatorButton index={props.index} value={props.item.operator ? props.item.operator : "=" } setOperator={ editOperatorValue }/>
            { fields.map((conval,i) =>
                <TextField
                    key={'actf'+i}
                    className={classes['input'+conval.type]}
                    id={'conval'+i}
                    label={conval.name}
                    value={editVal[conval.name]}
                    onChange={(e) => editValues(conval.name, e.target.value)}
                    type={typeFromType(conval.type)}
                />
            )}
        </ListItem>
        </GridItem>

    )
}
