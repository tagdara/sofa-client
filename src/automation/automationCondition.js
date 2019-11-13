import React, { Suspense, useState, useEffect} from 'react';
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
    },
    wideSelect: {
        width: "100%",
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

class AutomationInterface {
    
    constructor(property, value, setPropertyValue, setDefault) {
        this[property]=new AutomationControllerProperty(value)
        this.propName=[property]
        this.setDefault=setDefault
        this.setPropertyValue=setPropertyValue
    }
    
    directive(command, payload={}, cookie={}) {
        if (command==='TurnOn') { payload={ "value" : "ON" } }
        if (command==='TurnOff') { payload={ "value" : "OFF" } }
        console.log('automation directive', command, payload, cookie)
        this.setPropertyValue(payload.value)
    }
}

class AutomationControllerProperty {
    
    constructor(value) {
        this.value=value
        this.deepvalue = this.deepvalue.bind(this);
    }
    
    deepvalue() {
        // this is a shim to prevent the objects with value.value from breaking when value is null and javascript
        // throws an error.
        if (!this.value) return undefined;
        if (this.value.hasOwnProperty('value')) return this.value.value;
        return this.value;
    }

}


export default function AutomationCondition(props) {

    function directive(command, payload={}, cookie={}) {
        if (command==='TurnOn') { payload={ "value" : "ON" } }
        if (command==='TurnOff') { payload={ "value" : "OFF" } }
        console.log('automation directive', command, payload, cookie)
        setPropertyValue(payload.value)
    }

    let interfaceobj=new AutomationInterface(props.item.propertyName, props.item.value, directive)
    const classes = useStyles();
    const [propMod, setPropMod] = useState(loadPropMod(props.item.propertyName))
    const [autoInterface, setAutoInterface] = useState(interfaceobj)
    const [propertyValue, setPropertyValue] = useState(props.item.value)
    const [propertyName, setPropertyName] = useState(props.item.propertyName)
    const [controllerName, setControllerName] = useState(props.item.controller)
    const [op, setOperator] = useState(props.item.operator)

    useEffect(() => {
        function save() {
            var condition={ "controller": props.device.controllerForProperty(propertyName),
                            "deviceName": props.item.deviceName,
                            "endpointId": props.item.endpointId,
                            "operator": op,
                            "propertyName": propertyName,
                            "type": "property",
                            "value": propertyValue }
            console.log('saving', props.index, condition)
            props.save(props.index, condition)
        }      
        
        if (propertyValue!==undefined) {
            save()
        }
    }, [propertyName, propertyValue, controllerName, op ])
    
    useEffect(() => {
        setAutoInterface(new AutomationInterface(propertyName, propertyValue, setPropertyValue, setDefault))
    }, [propertyName, propertyValue, setPropertyValue, setAutoInterface ])

    function setDefault(val) {
        setPropertyValue(val)
    }

    function loadPropMod(name) {
        let pmod=React.lazy(() => { 
                try { 
                    return import('../controllers/properties/'+name).catch(() => ({ default: () => errorBlock(name) }))
                }
                catch {
                    return errorBlock(name)
                }
            })
        return pmod
    }

    function errorBlock(modulename) {
        return <TextField value={'failed'+modulename} />
    }
    
    function placeholder(modulename) {
        return <TextField value={modulename} />
    }
    
    function renderSuspenseModule( modulename ) {
        if (propMod!==undefined) {
            let Module=propMod
            return  <Suspense key={ modulename } fallback={placeholder}>
                        <Module interface={ autoInterface } device={props.device} />
                    </Suspense>
        } else {
            return <TextField value={'Loading...'} />
        }
    }
    
    function editOperatorValue(value) {
        setOperator(value)
        save()
    }

    function handleChangePropertyName(newval) {
        console.log('change propname', newval)
        setPropertyValue(undefined)
        setPropMod(loadPropMod(newval))
        setControllerName(props.device.controllerForProperty(newval))
        setPropertyName(newval)
    }
    
    function save() {
        var condition={ "controller": props.device.controllerForProperty(propertyName),
                        "deviceName": props.item.deviceName,
                        "endpointId": props.item.endpointId,
                        "operator": op,
                        "propertyName": propertyName,
                        "type": "property",
                        "value": propertyValue }
        console.log('saving', props.index, condition)
        props.save(props.index, condition)
    }

    return (
        <GridItem nolist={true} elevation={0} wide={true} xs={9}>
            <Grid item xs={props.wide ? 12 : 4 } >
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
            <Grid item xs={props.wide ? 12 : 4 } className={classes.flex} >
                <ListItem className={classes.reducedButtonPad} >
                    <Select className={classes.wideSelect} value={autoInterface.propName} onChange={(e) => handleChangePropertyName(e.target.value)} input={<BootstrapInput name="command" id="command-select" />} >
                    { props.device.properties().map(action => 
                        <MenuItem key={props.device.endpointId+action} value={action}>{action}</MenuItem>
                    )}
                    </Select>
                    <OperatorButton index={props.index} value={props.item.operator ? props.item.operator : "=" } setOperator={ editOperatorValue }/>
                </ListItem>
            </Grid>
            <Grid item xs={props.wide ? 12 : 4 } className={classes.flex} >
                <ListItem className={classes.reducedButtonPad} >
                    { renderSuspenseModule(autoInterface.propName) }
                </ListItem>
            </Grid>
        </GridItem>
    )
}
