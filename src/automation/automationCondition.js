import React, { Suspense, useState } from 'react';
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
    deviceName: {
        flexGrow:1,
        flexBasis:0,
        padding: 0,
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
        if (setDefault!==undefined) {
            this.setDefault=setDefault
        }
        this.setPropertyValue=setPropertyValue
    }
    
    directive(command, payload={}, cookie={}, instance={}) {
        if (command==='TurnOn') { payload="ON"}
        if (command==='TurnOff') { payload="OFF"}
        console.log('update payload', payload, cookie)
        this.setPropertyValue(payload)
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

    function updateItemValue(val) {
        console.log('updating item', val, {...props.item, 'value': val })
        props.save(props.index, {...props.item, "value": val})
    }

    let interfaceobj=new AutomationInterface(props.item.propertyName, props.item.value, updateItemValue)
    const classes = useStyles();
    const [propMod, setPropMod] = useState(loadPropMod(props.item.propertyName))

    function loadPropMod(name) {
        let pmod=React.lazy(() => { 
                try { 
                    return import('../controllers/properties/'+name).catch(() => ({ default: () => errorBlock(name) }))
                }
                catch {
                    return <TextField value={'failed '+name} />
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
            return  <Suspense key={ modulename } fallback={ placeholder() }>
                        <Module interface={ interfaceobj } device={props.device} />
                    </Suspense>
        }
        console.log('fallthrough')
        return <TextField value={'Loading...'} />
    }
    
    function editOperatorValue(value) {
        props.save(props.index, {...props.item, "operator": value})
    }

    function handleChangePropertyName(newval) {
        setPropMod(loadPropMod(newval))
        props.save(props.index, {...props.item, "value": undefined, "controller":props.device.controllerForProperty(newval), "propertyName": newval })
    }


    return (
        <GridItem nolist={true} elevation={0} wide={true} xs={9}>
            <Grid item xs={props.wide ? 12 : 4 } >
                <ListItem className={classes.listItem} >
                    <ListItemIcon><DeviceIcon name={props.device.displayCategories[0]} /></ListItemIcon>
                    <ListItemText primary={props.device.friendlyName} secondary={props.device.endpointId} />
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
                <ListItem >
                    <Select className={classes.wideSelect} value={props.item.propertyName} onChange={(e) => handleChangePropertyName(e.target.value)} input={<BootstrapInput name="command" id="command-select" />} >
                    { props.device.properties().map(action => 
                        <MenuItem key={props.device.endpointId+action} value={action}>{action}</MenuItem>
                    )}
                    </Select>
                    <OperatorButton index={props.index} value={props.item.operator ? props.item.operator : "=" } setOperator={ editOperatorValue }/>
                </ListItem>
            </Grid>
            <Grid item xs={props.wide ? 12 : 4 } className={classes.flex} >
                <ListItem>
                    { renderSuspenseModule(props.item.propertyName) }
                </ListItem>
            </Grid>
        </GridItem>
    )
}
