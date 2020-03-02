import React, { Suspense } from 'react';
import { useState } from 'react';
import { makeStyles } from '@material-ui/styles';

import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import TextField from '@material-ui/core/TextField';

import CloseIcon from '@material-ui/icons/Close';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import AutomationDevice from './AutomationDevice';
import AutomationInput from './AutomationInput';
import GridItem from '../GridItem';
import Grid from '@material-ui/core/Grid';

import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles({

    flex: {
        display: "flex",
    },
    wideSelect: {
        width: "100%",
    }
});


export default function AutomationTrigger(props) {

    const classes = useStyles();
    const interfaceobj=getInterface()
    const [propMod, setPropMod] = useState(loadPropMod(props.item.propertyName))

    function getInterface() {
        
        if (props.device===undefined) { return undefined }
        var dev=props.device
        if (dev.hasOwnProperty('capabilities')) {
            for (var j = 0; j < dev.capabilities.length; j++) {
                if (dev.capabilities[j].interface.split('.')[1]===props.item.controller) {
                    if (props.item.instance===undefined && dev.capabilities[j].interface.instance===undefined) {
                        return dev.capabilities[j]
                    }
                    if (props.item.hasOwnProperty('instance') && dev.capabilities[j].hasOwnProperty('instance')) {
                        if (props.item.instance===dev.capabilities[j].instance.split('.')[1]) {
                            return dev.capabilities[j]
                        }
                    }               
                }
            }
        }
        console.log('failed get interface',props.item.controller, props.item.instance ,props.device)
        return undefined
    }

    function errorBlock(modulename) {
        return <TextField value={'failed'+modulename} />
    }

    function loadPropMod(name) {
        if (name===undefined) { return undefined}
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

        if (props.device===undefined && otherdev===undefined) { return [] }
        var dev=props.device
        if (otherdev) { dev=otherdev }
        var dirs=[]
        console.log('XXXXY dev',dev)
        if (!dev.hasOwnProperty('capabilities')) { return [] }
        for (var j = 0; j < dev.capabilities.length; j++) {
            if (props.directives.hasOwnProperty(dev.capabilities[j].interface.split('.')[1])) {
                dirs=dirs.concat(Object.keys(props.directives[dev.capabilities[j].interface.split('.')[1]]));
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
            return  <Suspense key={ modulename } fallback={ placeholder() }>
                         <Module item={props.item} interface={ interfaceobj } device={props.device} instance={props.item.instance} directive={directive} />
                    </Suspense>
        } else {
            return null
        }
    }

    function handleChangePropertyName(newval) {
        setPropMod(loadPropMod(newval))
        props.save(props.index, {...props.item, "value": undefined, "controller":props.controllerForProperty(props.device.endpointId, newval), "propertyName": newval })
    }


    function selectDevice(newdevice) {
        console.log('selected new device',newdevice)
        var newitem={}
        setPropMod(loadPropMod(propertyFromDirective(newdevice.capabilities[0].interface, directives(newdevice.capabilities[0].interface)[0])))
        newitem={...props.item, instance: newdevice.capabilities[0].instance, name:newdevice.friendlyName, endpointId: newdevice.endpointId, controller:newdevice.capabilities[0], command:directives(newdevice.capabilities[0].interface)[0], value: undefined}
        props.save(props.index, newitem)
    }

    function directive (endpointId, controllerName, command, payload={}, cookie={}, instance) {
        if (command==='TurnOn') { payload="ON"}
        if (command==='TurnOff') { payload="OFF"}
        console.log('placeholder', props.index, {...props.item, controller:controllerName, command:command, instance: instance, value: payload})
        props.save(props.index, {...props.item, controller:controllerName, command:command, instance: instance, value: payload})
    }


    return (
        <GridItem nolist={true} elevation={0} wide={true} xs={12}>
            <AutomationDevice   device={props.device} index={props.index} selectDevice={selectDevice} wide={props.wide}
                                remove={props.remove} reorder={props.reorder}
                                moveUp={props.moveUp} moveDown={props.moveDown} delete={props.delete} />

            { props.device!==undefined &&
                <Grid item xs={props.wide ? 12 : 4 } className={classes.flex} >
                    <ListItem>
                        <Select className={classes.wideSelect} value={props.item.propertyName ? props.item.propertyName : ''} 
                                onChange={(e) => handleChangePropertyName(e.target.value)} 
                                input={<AutomationInput name="property" id="property-select" />} >
                        { props.controllerProperties.map(devProp => 
                            <MenuItem key={props.device.endpointId+devProp} value={devProp}>{devProp}</MenuItem>
                        )}
                        </Select>
                    </ListItem>
                </Grid>
            }
            { props.device!==undefined &&
                <Grid item xs={props.wide ? 12 : 4} className={classes.flex} >
                    <ListItem >
                        { renderSuspenseModule(props.item.propertyName) }
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
        </GridItem>
    )
}
