import React, { useState, Suspense } from 'react';
import { makeStyles, withStyles } from '@material-ui/styles';

import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import TextField from '@material-ui/core/TextField';

import CloseIcon from '@material-ui/icons/Close';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CropFreeIcon from '@material-ui/icons/CropFree';

import DeviceDialog from '../DeviceDialog';
import DeviceIcon from '../DeviceIcon';
import GridItem from '../GridItem';
import Grid from '@material-ui/core/Grid';

import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputBase from '@material-ui/core/InputBase';

const useStyles = makeStyles({

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
        this[property]=new AutomationControllerProperty(value,property)
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
    
    // This is slightly different for actions instead of conditions
    constructor(value, property) {
        if (value===undefined) { 
            this.value=undefined 
        } else if (value.hasOwnProperty(property)) {
            this.value=value[property]
        } else {
            this.value=value
        }
        //this.value=value
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

export default function AutomationAction(props) {
    
    const classes = useStyles();
    const [deviceSelect, setDeviceSelect] = useState(false);
    const pfd = propertyFromDirective(controllerForDirective(props.item.command), props.item.command)
    const [propMod, setPropMod] = useState(loadPropMod(pfd))
    let interfaceobj=new AutomationInterface(propertyFromDirective(props.item.controller, props.item.command), props.item.value, updateItemValue)
    
    function updateItemValue(val) {
        console.log('updating item',val, {...props.item, 'value': val })
        props.save(props.index, {...props.item, 'value': val })
    }

    function errorBlock(modulename) {
        return <TextField value={'failed'+modulename} />
    }

    function loadPropMod(name) {
        if (name===undefined) {
            return null
        }
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

    function propertyFromDirective(controllerName, directiveName) {
        if (controllerName===undefined || directiveName===undefined) {
            return undefined
        }
        if (props.directives.hasOwnProperty(controllerName) && props.directives[controllerName].hasOwnProperty(directiveName)) {
            var actionValues = props.directives[controllerName][directiveName]
            for (var av in actionValues) {
                return av
            }
        }
        return undefined
    }

    function directives(otherdev) {
        var dev=props.device
        if (otherdev) { dev=otherdev }
        var dirs=[]
        if (dev.hasOwnProperty('interfaces')) {
            for (var j = 0; j < dev.interfaces.length; j++) {
                if (props.directives.hasOwnProperty(dev.interfaces[j])) {
                    dirs=dirs.concat(Object.keys(props.directives[dev.interfaces[j]]));
                } else {
                    if (dev[dev.interfaces[j]].controller==='ModeController') {
                        dirs=dirs.concat('SetMode.'+dev.interfaces[j])
                    }
                }
            }
        } else {
            console.log('no interfaces in device', props.device)
        }

        return dirs
    }
    
    function placeholder(modulename) {
        return <TextField value={modulename} />
    }
    
    function renderSuspenseModule( modulename ) {

        if (propMod!==undefined) {
            if (propMod===null) {
                return null
            }
            let Module=propMod
            return  <Suspense key={ modulename } fallback={ placeholder() }>
                        <Module interface={ interfaceobj } device={props.device} instance={props.item.instance} />
                    </Suspense>
        } else {
            return <TextField value={'Loading...'} />
        }
    }
    
    function controllerForDirective(dir) {
        if (props.device===undefined || dir===undefined) { return undefined }
        
        for (var prop in props.directives) { // This is actually the list of controllers
            //if (props.device.interfaces.includes(prop) && props.directives[prop].hasOwnProperty(dir)) {
            if (props.directives[prop].hasOwnProperty(dir)) {
                return prop
            }
            if (props.item.hasOwnProperty('instance') && props.item.instance!==undefined) {
                if (props.directives[prop].hasOwnProperty(props.item.command)) {
                    return prop
                } 
            }     
        }
        return undefined
    }

    function handleChangeDirectiveName(newval) {

        setPropMod(loadPropMod(propertyFromDirective(controllerForDirective(newval.split('.')[0]), newval.split('.')[0])))
        props.save(props.index, {...props.item, controller:controllerForDirective(newval.split('.')[0]), command:newval.split('.')[0], instance: newval.split('.')[1], value: undefined})
    }
    
    function selectDevice(newdevice) {
        console.log('selected new device',newdevice)
        setDeviceSelect(false)
        var newitem={}

        if (newdevice[newdevice.interfaces[0]].hasOwnProperty('instance')) {
            setPropMod(loadPropMod(propertyFromDirective(newdevice[newdevice.interfaces[0]].controller, directives(newdevice[newdevice.interfaces[0]].controller)[0])))
            newitem={...props.item, instance: newdevice[newdevice.interfaces[0]].instance, name:newdevice.friendlyName, endpointId: newdevice.endpointId, controller:newdevice.interfaces[0], command:directives(newdevice)[0], value: undefined}
        } else {
            setPropMod(loadPropMod(propertyFromDirective(newdevice.interfaces[0], directives(newdevice)[0])))
            newitem={...props.item, instance: undefined, name:newdevice.friendlyName, endpointId: newdevice.endpointId, controller:newdevice.interfaces[0], command:directives(newdevice)[0], value: undefined}
            //newitem={...item, name:newdevice.friendlyName, endpointId: newdevice.endpointId, controller:undefined, command:undefined, value: undefined}
        }
        props.save(props.index, newitem)
    }
    
    function closeDialog() {
        setDeviceSelect(false)
    }
    
    function getCommand() {
        if (props.item.command!==undefined) {
            if (props.item.hasOwnProperty('instance') && props.item.instance!==undefined) {
                return props.item.command+"."+props.item.instance
            }
            return props.item.command
        }
        return ''
    }

    return (
        <GridItem nolist={true} elevation={0} wide={true} xs={12}>
            <Grid item xs={props.wide ? 12 : 4 } >
                <ListItem>
                    { props.device===undefined ?
                        <>  
                            <ListItemIcon><CropFreeIcon /></ListItemIcon>
                            <Button size="medium" onClick={() => setDeviceSelect(true) }>Choose a device</Button>
                        </>
                    :
                        <>
                            <ListItemIcon><DeviceIcon name={props.device.displayCategories[0]} /></ListItemIcon>
                            <ListItemText primary={props.device.friendlyName} secondary={props.device.displayCategories[0]} onClick={() => setDeviceSelect(true) } />
                        </>
                    }
                    { props.wide && 
                        <>
                            { props.remove &&
                                <ListItemSecondaryAction>
                                    <IconButton size="small" onClick={() => props.delete(props.index)}><CloseIcon /></IconButton>     
                                </ListItemSecondaryAction>
                            }
                            { props.reorder &&
                                <ListItemSecondaryAction>
                                    { props.index > 0 &&
                                        <IconButton size="small" onClick={() => props.moveUp(props.index)}><ExpandLessIcon /></IconButton>
                                    }
                                    <IconButton size="small" onClick={() => props.moveDown(props.index)}><ExpandMoreIcon /></IconButton>
                                </ListItemSecondaryAction>
                            }
                        </>
                    }
                </ListItem>
            </Grid>
            { props.device!==undefined &&
                <Grid item xs={props.wide ? 12 : 4 } className={classes.flex} >
                    <ListItem>
                        <Select className={classes.wideSelect} value={getCommand()} onChange={(e) => handleChangeDirectiveName(e.target.value)} input={<BootstrapInput name="command" id="command-select" />} >
                        { directives().map(action => 
                            <MenuItem key={props.device.endpointId+action} value={action}>{action}</MenuItem>
                        )}
                        </Select>
                    </ListItem>
                </Grid>
            }
            { props.device!==undefined &&
                <Grid item xs={props.wide ? 12 : 4} className={classes.flex} >
                    <ListItem >
                        { interfaceobj ? 
                            renderSuspenseModule( interfaceobj.propName)
                            : null
                        }
                    </ListItem>
                </Grid>
            }
            { !props.wide && 
                <>
                    { props.remove &&
                        <ListItemSecondaryAction>
                            <IconButton size="small" onClick={() => props.delete(props.index)}><CloseIcon /></IconButton>     
                        </ListItemSecondaryAction>
                    }
                    { props.reorder &&
                        <ListItemSecondaryAction>
                            { props.index > 0 &&
                                <IconButton size="small" onClick={() => props.moveUp(props.index)}><ExpandLessIcon /></IconButton>
                            }
                            <IconButton size="small" onClick={() => props.moveDown(props.index)}><ExpandMoreIcon /></IconButton>
                        </ListItemSecondaryAction>
                    }
                </>
            }
            { deviceSelect &&
                <DeviceDialog open={true} close={closeDialog} select={selectDevice} />
            }
        </GridItem>
    )
}
