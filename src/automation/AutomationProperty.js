import React, { Suspense, useState, useEffect } from 'react';
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
        height: 72,
        alignItems: "center",
        padding: 16,
    },
    wideSelect: {
        width: "100%",
    }
});


export default function AutomationCondition(props) {
    
    const classes = useStyles();
    const [propMod, setPropMod] = useState(undefined)
    
    useEffect(() => {
        setPropMod(loadPropMod(props.item.propertyName))
    // eslint-disable-next-line
    }, [ props.item.propertyName ])    
 
    function errorBlock(modulename) {
        return <TextField value={'failed'+modulename} />
    }
    
    function placeholder(modulename) {
        return <TextField value={modulename} />
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
    
    function renderSuspenseModule( modulename ) {
        
        if (propMod!==undefined) {
            if (propMod===null) {
                return null
            }
            let Module=propMod
            return  <Suspense key={ modulename } fallback={ placeholder() }>
                        <Module item={props.item} interface={ props.interface } device={props.device} instance={props.item.instance} directive={props.directive} />
                    </Suspense>
        } else {
            return <TextField value={'Loading...'} />
        }
    }

    function handleChangePropertyName(newval) {
        setPropMod(loadPropMod(newval))
        props.save(props.index, {...props.item, "value": undefined, "controller":props.controllerForProperty(props.device.endpointId, newval), "propertyName": newval })
    }
    
    return (
        <Grid item xs={props.wide ? 12 : 4 } className={classes.flex} >
            { renderSuspenseModule(props.item.propertyName) }
        </Grid>
    )
}
