import React, { useState, Suspense } from 'react';
import { makeStyles, withStyles } from '@material-ui/styles';

import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import TextField from '@material-ui/core/TextField';

import CloseIcon from '@material-ui/icons/Close';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import AutomationDevice from './AutomationDevice';
import GridItem from '../GridItem';
import Grid from '@material-ui/core/Grid';

import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputBase from '@material-ui/core/InputBase';

const useStyles = makeStyles({

    flex: {
        display: "flex",
        height: 72,
        alignItems: "center",
        padding: 16,
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


export default function AutomationAction(props) {
    
    const classes = useStyles();
    const pfd = propertyFromDirective(controllerForDirective(props.item.command), props.item.command)
    const [propMod, setPropMod] = useState(loadPropMod(pfd))
    const interfaceProperty = propertyFromDirective(props.item.controller, props.item.command)
    const interfaceobj=getInterface()

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
        var directiveName=newval
        console.log('setting new directive',newval)
        setPropMod(loadPropMod(propertyFromDirective(controllerForDirective(directiveName.split('.')[0]), directiveName.split('.')[0])))
        props.save(props.index, {...props.item, controller:controllerForDirective(directiveName.split('.')[0]), command:directiveName.split('.')[0], instance: directiveName.split('.')[1], value: undefined})
    }

    function selectDevice(newdevice) {
        console.log('selected new device',newdevice)
        var newitem={}
        setPropMod(loadPropMod(propertyFromDirective(newdevice.capabilities[0].interface, directives(newdevice.capabilities[0].interface)[0])))
        newitem={...props.item, instance: newdevice.capabilities[0].instance, name:newdevice.friendlyName, endpointId: newdevice.endpointId, controller:newdevice.capabilities[0], command:directives(newdevice.capabilities[0].interface)[0], value: undefined}
        props.save(props.index, newitem)
    }

    function getCommand() {
        console.log('getcommand',props.item)
        if (props.item.command!==undefined) {
            if (props.item.hasOwnProperty('instance') && props.item.instance!==undefined) {
                return props.item.command+"."+props.item.instance
            }
            console.log('getcommand result',props.item.command)
            return props.item.command
        }
        return ''
    }

    return (
        <GridItem nolist={true} elevation={0} wide={true} xs={12}>
            <AutomationDevice   device={props.device} index={props.index} selectDevice={selectDevice} wide={props.wide}
                                remove={props.remove} reorder={props.reorder}
                                moveUp={props.moveUp} moveDown={props.moveDown} delete={props.delete} />
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
                    { interfaceobj &&
                        renderSuspenseModule( interfaceProperty)
                    }
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
