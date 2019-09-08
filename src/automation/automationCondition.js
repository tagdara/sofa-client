import React from 'react';
import { useState, useEffect } from 'react';
import { makeStyles, withStyles } from '@material-ui/styles';

import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import TextField from '@material-ui/core/TextField';

import CloseIcon from '@material-ui/icons/Close';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import DeviceIcon from '../DeviceIcon';
import GridItem from '../GridItem';
import OperatorButton from "./operatorButton"
import Grid from '@material-ui/core/Grid';

import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputBase from '@material-ui/core/InputBase';


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
    flex: {
        display: "flex",
    }
});

const BootstrapInput = withStyles(theme => ({
    input: {
        minWidth: '100px',
        borderRadius: 4,
        position: 'relative',
        backgroundColor: theme.palette.background.paper,
        border: '1px solid #ced4da',
        fontSize: 16,
        padding: '10px 26px 10px 12px',
        transition: theme.transitions.create(['border-color', 'box-shadow']),
        '&:focus': {
            borderRadius: 4,
            borderColor: '#80bdff',
            boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
        },
    },
}))(InputBase);

export default function AutomationCondition(props) {

    const classes = useStyles();
    const [fields, setFields] = useState([])
    const [editVal, setEditVal] = useState({})

    useEffect(() => {
        function parseControllerProperties() {
            var subfields=[]
            var edval={}
            for (var cp in props.controllerProperties) {
                subfields.push({ 'name':cp, 'type': props.controllerProperties[cp] })
                edval[cp]=''
                if (props.item.hasOwnProperty('value') && props.item.value.hasOwnProperty(cp)) {
                    edval[cp]=props.item.value[cp]
                }
            }
            console.log('controller props:', props.controllerProperties)
            setFields(subfields)
            setEditVal(edval)
        }
        
        parseControllerProperties()
    }, [props.item, props.controllerProperties]);
    
    
    function editOperatorValue(value) {
        var condition=props.item
        condition.operator=value
        props.save(props.index, condition)
    }

    function editValues(conval, value) {
        var condition=props.item
        var edval=editVal
        edval[conval]=value     
        setEditVal(edval)
        condition.value=edval
        props.save(props.index, condition)
    }
    
    function typeFromType(vartype) {
        if (vartype==="time") {
            return "time"
        } else if  (vartype==="percentage") {
            return "number"
        } else if  (vartype==="integer") {
            return "number"
        } else {
            return "text"
        }
    }

    function handleChange() {
        console.log('noop change')
    }

    function getDeviceProperties() {
        var proplist=[]
        for (var i = 0; i < props.device.interfaces.length; i++) {
            console.log(props.device.interfaces[i], props.device[props.device.interfaces[i]].properties)
            proplist = proplist.concat(props.device[props.device.interfaces[i]].properties);
        } 
        return proplist
    }
    
    return (
        <GridItem nolist={true} elevation={0} wide={true}>
            <Grid item xs={props.wide ? 12 : 6 } >
                <ListItem className={classes.listItem} >
                    <ListItemIcon><DeviceIcon name={props.device.displayCategories[0]} /></ListItemIcon>
                    <ListItemText primary={props.device.friendlyName} secondary={props.device.endpointId} className={classes.deviceName}/>
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
            </Grid>
            <Grid item xs={props.wide ? 12 : 6 } className={classes.flex} >
                <ListItem className={classes.reducedButtonPad} >
                    <Select value={props.item.propertyName} onChange={handleChange} input={<BootstrapInput name="command" id="command-select" />} >
                        <MenuItem value=""><em>Choose an property</em></MenuItem>
                    { getDeviceProperties().map(action => 
                        <MenuItem key={props.device.endpointId+action} value={action}>{action}</MenuItem>
                    )}
                    </Select>
                    <OperatorButton index={props.index} value={props.item.operator ? props.item.operator : "=" } setOperator={ editOperatorValue }/>
                    { fields.map((conval,i) =>
                        <TextField
                            key={'cdf'+i}
                            className={classes['input'+conval.type]}
                            id={'cdf'+i}
                            label={conval.name}
                            value={editVal[conval.name]}
                            onChange={(e) => editValues(conval.name, e.target.value)}
                            type={typeFromType(conval.type)}
                        />
                    )}
                </ListItem>
            </Grid>
        </GridItem>

    )
}
