import React, { Suspense } from 'react';
import { useState, useEffect } from 'react';
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
        this.setDefault=setDefault
        this.setPropertyValue=setPropertyValue
    }
    
    directive(command, payload={}, cookie={}) {
        if (command==='TurnOn') { payload={ "value" : "ON" } }
        if (command==='TurnOff') { payload={ "value" : "OFF" } }
        console.log('automation directive', command, payload, cookie)
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

export default function AutomationTrigger(props) {

    const classes = useStyles();
    const [deviceSelect, setDeviceSelect] = useState(false);
    const [autoInterface, setAutoInterface] = useState(undefined)
    const [item, setItem]=useState(props.item)
    const [propMod, setPropMod] = useState(loadPropMod(item.propertyName))

    useEffect(() => {
        if (item.value!==undefined) {
            save()
        }
    }, [ item ])
    
    useEffect(() => {
        console.log('item useeffect', item)
        setAutoInterface(new AutomationInterface(item.propertyName, item.value, updateItemValue, setDefault))
    }, [item.propertyName, item.value, setAutoInterface ])

    function setDefault(val) {
        console.log('set default', val)
        setItem({...item, 'value': val })
        save({...item, 'value': val })
    }
    
    function updateItemValue(val) {
        console.log('updating item',val, {...item, 'value': val })
        setItem({...item, 'value': val })
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

    function getDeviceProperties() {
        var proplist=[]
        for (var i = 0; i < props.device.interfaces.length; i++) {
            //console.log(props.device.interfaces[i], props.device[props.device.interfaces[i]].properties)
            proplist = proplist.concat(props.device[props.device.interfaces[i]].properties);
        } 
        return proplist
    }

    function directives(otherdev) {
        var dev=props.device
        if (otherdev) { dev=otherdev }
        var dirs=[]
        for (var j = 0; j < dev.interfaces.length; j++) {
            if (props.directives.hasOwnProperty(dev.interfaces[j])) {
                dirs=dirs.concat(Object.keys(props.directives[dev.interfaces[j]]));
            }
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
            return  <Suspense key={ modulename } fallback={placeholder}>
                        <Module interface={ autoInterface } device={props.device} />
                    </Suspense>
        } else {
            return <TextField value={'Loading...'} />
        }
    }
    
    function controllerForDirective(dir) {
        if (props.device===undefined) { return undefined }
        for (var prop in props.directives) { // This is actually the list of controllers
            if (props.device.interfaces.includes(prop) && props.directives[prop].hasOwnProperty(dir)) {
                return prop
            }
        }
        return undefined
    }

    function controllerForProperty(devProp) {
        if (props.device===undefined) { return undefined }
        console.log('cfp',props.device.interfaces, devProp, props.device)
        for (var j = 0; j < props.device.interfaces.length; j++) {
            console.log('pif',props.device.interfaces[j], props.device[props.device.interfaces[j]])
            if (props.device[props.device.interfaces[j]].hasOwnProperty(devProp)) {
                return props.device.interfaces[j]
            }
        }
        return undefined
    }

    function handleChangePropertyName(newval) {
        console.log('XXXXXX',{...item, controller:controllerForProperty(newval), propertyName:newval, value: undefined})
        setItem({...item, controller:controllerForProperty(newval), propertyName:newval, value: undefined})
        setPropMod(loadPropMod(newval))
        //save({...item, controller:controllerForDirective(newval), command:newval, value: undefined})
    }

    function handleChangeDirectiveName(newval) {
        setItem({...item, controller:controllerForDirective(newval), command:newval, value: undefined})
        setPropMod(loadPropMod(propertyFromDirective(controllerForDirective(newval), newval)))
        save({...item, controller:controllerForDirective(newval), command:newval, value: undefined})
    }
    
    function save(newitem) {
        if (newitem) {
            //console.log('saving', props.index, newitem)
            props.save(props.index, newitem)
        } else {
            //console.log('saving', props.index, item)
            props.save(props.index, item)
        }
    }
    
    function selectDevice(newdevice) {
        setDeviceSelect(false)
        var newitem={}
        if (newdevice.interfaces.includes(item.controller)) {
            newitem={...item, name:newdevice.friendlyName, endpointId: newdevice.endpointId }
        } else {
            setPropMod(loadPropMod(propertyFromDirective(newdevice.interfaces[0], directives(newdevice)[0])))
            newitem={...item, name:newdevice.friendlyName, endpointId: newdevice.endpointId, controller:newdevice.interfaces[0], command:directives(newdevice)[0], value: undefined}
            //newitem={...item, name:newdevice.friendlyName, endpointId: newdevice.endpointId, controller:undefined, command:undefined, value: undefined}
        }
        setItem(newitem)
        save(newitem)
    }
    
    function closeDialog() {
        setDeviceSelect(false)
    }

    return (
        <GridItem nolist={true} elevation={0} wide={true} xs={9}>
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
                        <Select className={classes.wideSelect} value={props.item.propertyName ? props.item.propertyName : ''} onChange={(e) => handleChangePropertyName(e.target.value)} input={<BootstrapInput name="property" id="property-select" />} >
                        { getDeviceProperties().map(devProp => 
                            <MenuItem key={props.device.endpointId+devProp} value={devProp}>{devProp}</MenuItem>
                        )}
                        </Select>
                    </ListItem>
                </Grid>
            }
            { props.device!==undefined &&
                <Grid item xs={props.wide ? 12 : 4} className={classes.flex} >
                    <ListItem >
                        { autoInterface ? 
                            renderSuspenseModule(autoInterface.propName)
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
