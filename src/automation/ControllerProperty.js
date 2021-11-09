import React from 'react';
import { makeStyles } from '@mui/styles';

import AutomationInput from './AutomationInput';

import ListItem from '@mui/material/ListItem';
import OperatorButton from "./operatorButton"
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { propertyMap } from 'store/deviceHelpers'

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
        height: 64,
        alignItems: "center",
    },
    wideSelect: {
        width: "100%",
    }
});


export default function ControllerProperty(props) {

    const classes = useStyles();
    const propMap=propertyMap(props.device)

    function editOperatorValue(value) {
        console.log('saving op',value)
        props.save(props.index, {...props.item, "operator": value})
    }

    function handleChangePropertyName(newval) {
        props.save(props.index, {...props.item, "instance": newval.instance, "value": undefined, "command": undefined, "controller":newval.controller, "propertyName": newval.property })
    }

    function defaultOrValue() { 
        for (var j = 0; j < propMap.length; j++) {
            if ((propMap[j].instance===props.item.instance) && (propMap[j].controller===props.item.controller) && (propMap[j].property===props.item.propertyName)) {
                return propMap[j]
            }
        }
        return ""
    }
    
    function propkey(propItem) {
        try {
            if (propItem.instance!==undefined) {
                return propItem.instance
            } 
        }
        catch {}
        return propItem.property
    }
    
    //function OldcausesrenderissuesopDefaultOrValue() {
    //    if (props.item.operator) { return props.item.operator}
    //    if (props.anyOp) { editOperatorValue('Any'); return 'Any' }
    //    editOperatorValue('=')
    //    return '='
    //}

    function opDefaultOrValue() {
        if (props.item.operator) { return props.item.operator}
        if (props.anyOp) { return 'Any' }
        return '='
    }


    return (
        props.device!==undefined ?
            <Grid item xs={props.wide ? 12 : 4 } className={classes.flex} >
                <ListItem >
                    <Select className={classes.wideSelect} value={ defaultOrValue() } 
                            onChange={(e) => handleChangePropertyName(e.target.value)} 
                            input={<AutomationInput name="command"/>} >
                    { propMap.map( propItem => 
                        <MenuItem key={propkey(propItem)} value={propItem}>{ propItem.instance ? propItem.instance.split('.')[1] : propItem.property }</MenuItem>
                    )}
                    </Select>
                    <OperatorButton index={props.index} value={ opDefaultOrValue() } setOperator={ editOperatorValue } anyOp={props.anyOp} />
                </ListItem>
            </Grid>
        :
        null
    )
}
