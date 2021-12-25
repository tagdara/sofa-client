import React from 'react';
import { makeStyles } from '@mui/styles';

import CardLine from 'components/CardLine'
import OperatorButton from "./input/operatorButton"
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

import ActivityLineSegment from '../archive/activity/editor/layout/ActivityLineSegment'

import { mapDeviceProperties, deviceByEndpointId }  from 'store/deviceHelpers'
import { updateActivityItem } from 'store/activityEditorHelpers'
import useActivityEditorStore from 'store/activityEditorStore'

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
        alignItems: "center",
    },
    wideSelect: {
        width: "100%",
    }
});


export default function ControllerProperty(props) {

    const classes = useStyles();
    const item = useActivityEditorStore(state => state.activity[props.category][props.index] )

    if (!item) { return null }

    const endpointId = item.endpointId
    const device = endpointId ? deviceByEndpointId(endpointId) : undefined
    const propertyMap = device ? mapDeviceProperties(device) : []

    if (!propertyMap) { return null }

    function editOperatorValue(value) {
        console.log('saving op',value)
        props.save(props.index, {...item, "operator": value})
    }

    function handleChangePropertyName(updatedValue) {
        const updatedItem = {...item, "instance": updatedValue.instance, 
                                    "value": undefined, "command": undefined, 
                                    "controller":updatedValue.controller, "propertyName": updatedValue.property 
                            }

        updateActivityItem(props.category, props.index, updatedItem)
    }

    function defaultOrValue() { 
        for (var j = 0; j < propertyMap.length; j++) {
            if ((propertyMap[j].instance===item.instance) && (propertyMap[j].controller===item.controller) && (propertyMap[j].property===item.propertyName)) {
                return propertyMap[j]
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

    function opDefaultOrValue() {
        if (item.operator) { return item.operator}
        if (props.anyOp) { return 'Any' }
        return '='
    }

    return (
        <ActivityLineSegment wide={props.wide} >
            <CardLine >
                <Select className={classes.wideSelect} value={ defaultOrValue() } 
                        onChange={(e) => handleChangePropertyName(e.target.value)} 
                        size="small" 
                >
                { propertyMap.map( propItem => 
                    <MenuItem key={propkey(propItem)} value={propItem}>{ propItem.instance ? propItem.instance.split('.')[1] : propItem.property }</MenuItem>
                )}
                </Select>
                <OperatorButton index={props.index} value={ opDefaultOrValue() } setOperator={ editOperatorValue } anyOp={props.anyOp} />
            </CardLine>
        </ActivityLineSegment>
    )
}
