import React, { Suspense, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import AutomationInput from './AutomationInput';
import AutomationDevice from './AutomationDevice';

import ListItem from '@material-ui/core/ListItem';
import TextField from '@material-ui/core/TextField';
import GridItem from '../GridItem';
import OperatorButton from "./operatorButton"
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

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


export default function AutomationCondition(props) {

    const classes = useStyles();
    const interfaceobj=getInterface()
    const [propMod, setPropMod] = useState(loadPropMod(props.item.propertyName))
    
    console.log('cp device', props.controllerProperties)
    
    function directive (endpointId, controllerName, command, payload={}, cookie={}, instance) {
        if (command==='TurnOn') { payload="ON"}
        if (command==='TurnOff') { payload="OFF"}
        props.save(props.index, {...props.item, controller:controllerName, command:command, instance: instance, value: payload})
    }

    function getInterface() {
        
        if (props.device===undefined) { return undefined }
        if (props.device.hasOwnProperty('capabilities')) {
            for (var j = 0; j < props.device.capabilities.length; j++) {
                if (props.device.capabilities[j].interface.split('.')[1]===props.item.controller) {
                    if (props.item.instance===undefined && props.device.capabilities[j].interface.instance===undefined) {
                        return props.device.capabilities[j]
                    }
                    if (props.item.hasOwnProperty('instance') && props.device.capabilities[j].hasOwnProperty('instance')) {
                        if (props.item.instance===props.device.capabilities[j].instance.split('.')[1]) {
                            return props.device.capabilities[j]
                        }
                    }               
                }
            }
        }
        console.log('failed get interface',props.item.controller, props.item.instance ,props.device)
        return undefined
    }

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
            if (propMod===null) {
                return null
            }
            let Module=propMod
            return  <Suspense key={ modulename } fallback={ placeholder() }>
                        <Module item={props.item} interface={ interfaceobj } device={props.device} instance={props.item.instance} directive={directive} />
                    </Suspense>
        } else {
            return <TextField value={'Loading...'} />
        }
    }
     
    function editOperatorValue(value) {
        props.save(props.index, {...props.item, "operator": value})
    }

    function handleChangePropertyName(newval) {
        setPropMod(loadPropMod(newval))
        props.save(props.index, {...props.item, "value": undefined, "controller":props.controllerForProperty(props.device.endpointId, newval), "propertyName": newval })
    }
    
    function directives(otherdev) {

        var dev=props.device
        if (otherdev) { dev=otherdev }
        var dirs=[]
        if (dev.hasOwnProperty('capabilities')) {
            for (var j = 0; j < dev.capabilities.length; j++) {
                var shortIf=dev.capabilities[j].interface.split('.')[1]
                if (shortIf==='ModeController') {
                    dirs=dirs.concat('SetMode.'+dev.capabilities[j].instance.split('.')[1])
                } else if (props.directives.hasOwnProperty(shortIf)) {
                    dirs=dirs.concat(Object.keys(props.directives[shortIf]));
                } 
            }
        }
        return dirs
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
    
    function selectDevice(newdevice) {
        console.log('selected new device',newdevice)
        var newitem={}
        setPropMod(loadPropMod(propertyFromDirective(newdevice.capabilities[0].interface, directives(newdevice.capabilities[0].interface)[0])))
        newitem={...props.item, instance: newdevice.capabilities[0].instance, name:newdevice.friendlyName, endpointId: newdevice.endpointId, controller:newdevice.capabilities[0], command:directives(newdevice.capabilities[0].interface)[0], value: undefined}
        props.save(props.index, newitem)
    }


    return (
        <GridItem nolist={true} elevation={0} wide={true} xs={12}>
            <AutomationDevice   device={props.device} index={props.index} selectDevice={selectDevice} wide={props.wide}
                                remove={props.remove} reorder={props.reorder}
                                moveUp={props.moveUp} moveDown={props.moveDown} delete={props.delete} />
            { props.device!==undefined &&
                <Grid item xs={props.wide ? 12 : 4 } className={classes.flex} >
                    <ListItem >
                        <Select className={classes.wideSelect} value={props.item.propertyName} 
                                onChange={(e) => handleChangePropertyName(e.target.value)} 
                                input={<AutomationInput name="command" id="command-select" />} >
                        { props.controllerProperties.map(action => 
                            <MenuItem key={props.device.endpointId+action} value={action}>{action}</MenuItem>
                        )}
                        </Select>
                        <OperatorButton index={props.index} value={props.item.operator ? props.item.operator : "=" } setOperator={ editOperatorValue }/>
                    </ListItem>
                </Grid>
            }
            { (props.device!==undefined && props.item.propertyName!==undefined) &&
                <Grid item xs={props.wide ? 12 : 4 } className={classes.flex} >
                    <ListItem>
                        { renderSuspenseModule(props.item.propertyName) }
                    </ListItem>
                </Grid>
                }
        </GridItem>
    )
}
