import React, { Suspense, useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';

import Button from '@material-ui/core/Button';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

import { register, unregister, deviceByEndpointId } from 'store/deviceHelpers'
import useDeviceStateStore from 'store/deviceStateStore'

const placeholder = <TableRow><TableCell>Loading...</TableCell></TableRow>

const useStyles = makeStyles({
 
    iconSize: {
        height: 24,
        width: 24,
    },
    stack: {
        height: 44,
        display: "flex",
        flexGrow: 1,
        paddingLeft: 16,
        justifyContent: "space-between",
        flexWrap: "wrap",
    },
    tile: {
        display: "flex",
        flexGrow: 1,
        height: 90,
        paddingRight: 8,
    },
    sliderPaper: {
        display: "flex",
        flexDirection: "row",
        padding: "16 8 16 16",
        alignItems: "center",
    },
    nostack: {
        height: 44,
        display: "flex",
        flexGrow: 1,
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        maxWidth: 480,
        minWidth: 240,
        boxSizing: "border-box",
        marginRight: 8,
    },
    lightSwitch: {
        marginLeft: 8,
    },
    lightbar: {
        width: "100%",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
    },
    placeholder: {
        height: 57,
        width: "100%",
    },
    listItem: {
        maxHeight: 64,
        width: "100%",
    },
    tableAuto: {
        tableLayout: "auto",
    },
    cola:{
        width: "25%"
    },
    colb:{
        width: "5%"
    },
    colc:{
        width: "70%"
    },
    nopad: {
        padding: 0,
    }

});

const CompositeDevice = props => {
    
    const classes = useStyles();
    const isMobile = window.innerWidth <= 800;
    const [modules, setModules] = useState({})

    const device = deviceByEndpointId(props.endpointId)
    const deviceState = useDeviceStateStore( state => state.deviceStates[props.endpointId] )

    useEffect(() => {
        register(props.endpointId, "composite-"+props.endpointId)
        return function cleanup() {
            unregister(props.endpointId, "composite-"+props.endpointId)
        };
    // eslint-disable-next-line 
    }, [props.endpointId])
 
    useEffect(() => {
        if (device) { getCapabilityModules() }
    // eslint-disable-next-line 
    }, [ device ])    
    
    if (!device) { return null }

    const capabilities = device.capabilities
    const name = device.friendlyName

    function getCapabilityModules() {
        var mods={}
        for (var j = 0; j < device.capabilities.length; j++) {
            if (device.capabilities[j].interface.split('.').length>1) {
                let modulename=device.capabilities[j].interface.split('.')[1]
                mods[modulename]=React.lazy(() => { 
                    try { 
                        return import('controllers/'+modulename).catch(() => ({ default: () => errorBlock(modulename) }))
                    }
                    catch {
                        return errorBlock(modulename)
                    }
                })
            }
        }
        setModules(mods)
    }


    function errorBlock(modulename) {
        return <TableRow key={modulename+'e'}><TableCell>-</TableCell><TableCell>-</TableCell><TableCell>Loading failed - {modulename}</TableCell></TableRow>;
    }
        
    function renderSuspenseModule( interfaceName, instance ) {
        if (!interfaceName || interfaceName.split('.').length<2) {
            return null
        }

        try {
            let modulename = interfaceName.split('.')[1]
            if (modules.hasOwnProperty(modulename)) {
                var Module=modules[modulename]
                var detailName = instance ? instance.split('.')[1] : modulename
                var interfaceState = deviceState[detailName]
                return  <Suspense key={ detailName } fallback={placeholder}>
                            <Module interface={ interfaceState } device={device} deviceState={deviceState} instance={ instance } />
                        </Suspense>
            }
        }
        catch {
            return <TableRow key={interfaceName} ><TableCell>Error with {interfaceName}</TableCell></TableRow>
        }
        return <TableRow key={interfaceName} ><TableCell>Loading...</TableCell></TableRow>
    }
    
    
    return (
        <Dialog fullScreen={isMobile} fullWidth maxWidth={'sm'}  open={true} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
            <DialogTitle id="composite-device">{ name }</DialogTitle>
            <DialogContent className={isMobile? classes.nopad : null} >
                <Table size="small" className={classes.tableAuto} >
                    <TableBody>
                            <TableRow>
                                <TableCell className={classes.cola} >Name</TableCell>
                                <TableCell className={classes.colb} >Value</TableCell>
                                <TableCell className={classes.colc} >Set</TableCell>
                            </TableRow>

                        { capabilities.map( capability => 
                            renderSuspenseModule(capability.interface, capability.instance)
                        )}
                    </TableBody>
                </Table>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.close} color="primary" autoFocus>
                    OK
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default CompositeDevice;

