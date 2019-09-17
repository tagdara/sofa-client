import React, { Suspense } from 'react';
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

class AutomationInterface {
    
    constructor(property, value, directive) {
        this[property]=new AutomationControllerProperty(value)
        this.propName=[property]
        console.log('directive',directive)
        this.directive=directive
    }

    xdirective(command, payload={}, cookie={}) {
        if (command==='TurnOn') { payload="ON" }
        if (command==='TurnOff') { payload="OFF" }
        console.log('automation directive', command, payload, cookie)
        this[this.propName]={ 'value':payload }
        console.log('This now',this)
    }
}

class AutomationControllerProperty {
    
    constructor(value) {
        this.value=value
    }
    
    get deepvalue() {
        // this is a shim to prevent the objects with value.value from breaking when value is null and javascript
        // throws an error.
        if (!this.value) return null;
        if (this.value.hasOwnProperty('value')) return this.value.value;
        return this.value;
    }
    
    deep() {
        // this is a shim to prevent the objects with value.value from breaking when value is null and javascript
        // throws an error.
        if (!this.value) return null;
        if (this.value.hasOwnProperty('value')) return this.value.value;
        return this.value;
    }
}


export default function AutomationCondition(props) {

    function directive(command, payload={}, cookie={}) {
        if (command==='TurnOn') { payload="ON" }
        if (command==='TurnOff') { payload="OFF" }
        console.log('automation directive', command, payload, cookie)
        var x = Object.assign({}, autoInterface);
        var newprop=new AutomationControllerProperty({ 'value': payload })
        console.log('newprop.deep',newprop.deepvalue)
        x[x.propName]=newprop
        setAutoInterface(x)
        console.log('This now',x)
    }
    
    let interfaceobj=new AutomationInterface(props.item.propertyName, props.item.value, directive)
    const classes = useStyles();
    const [propMod, setPropMod] = useState(loadPropMod(props.item.propertyName))
    const [autoInterface, setAutoInterface] = useState(interfaceobj)

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
        console.log('prop',propMod,modulename)
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
        var condition=props.item
        condition.operator=value
        props.save(props.index, condition)
    }

    function handleChangePropertyName(newval) {
        console.log('change propname', newval)
        setPropMod(loadPropMod(newval))

        var x = Object.assign({}, autoInterface);
        var newprop=new AutomationControllerProperty({ 'value': null })
        x[newval]=newprop
        x.propName=newval
        setAutoInterface(x)

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
                    <Select value={autoInterface.propName} onChange={(e) => handleChangePropertyName(e.target.value)} input={<BootstrapInput name="command" id="command-select" />} >
                        <MenuItem value=""><em>Choose a property</em></MenuItem>
                    { props.device.properties().map(action => 
                        <MenuItem key={props.device.endpointId+action} value={action}>{action}</MenuItem>
                    )}
                    </Select>
                    <OperatorButton index={props.index} value={props.item.operator ? props.item.operator : "=" } setOperator={ editOperatorValue }/>
                    { renderSuspenseModule(autoInterface.propName) }
                </ListItem>
            </Grid>
        </GridItem>

    )
}
