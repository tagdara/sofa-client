import React from 'react';
import { makeStyles } from '@mui/styles';
import CardLine from 'components/CardLine'
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { directives } from 'store/directive'
import { deviceByEndpointId, deviceDirectives }  from 'store/deviceHelpers'
import { updateActivityItem } from 'store/activityEditorHelpers'
import useActivityEditorStore from 'store/activityEditorStore'

const useStyles = makeStyles({

    flex: {
        display: "flex",
        alignItems: "center",
    },
    wideSelect: {
        width: "100%",
    }
});

export default function DeviceDirective(props) {
    
    const classes = useStyles();
    const item = useActivityEditorStore(state => state.activity[props.category][props.index] )

    if (!item) { return null }

    const endpointId = item.endpointId
    const device = endpointId ? deviceByEndpointId(endpointId) : undefined
    const directiveMap = deviceDirectives(device)

    function propertyFromDirective(controllerName, directiveName) {
        if (controllerName===undefined || directiveName===undefined) {
            return undefined
        }
        if (directives.hasOwnProperty(controllerName) && directives[controllerName].hasOwnProperty(directiveName)) {
            var actionValues = directives[controllerName][directiveName]
            for (var av in actionValues) {
                return av
            }
        }
        return undefined
    }
    
    function handleChangeDirectiveName(newval) {
        var propertyName=propertyFromDirective(newval.controller, newval.directive)
        var updatedItem = {...item, propertyName: propertyName, controller:newval.controller, command:newval.directive, instance: newval.instance, value: undefined}
        updateActivityItem(props.category, props.index, updatedItem)
    }
    
    function defaultOrValue() { 
        var controller = item.controller
        if (!controller) { return "" }
        if (controller.includes('.')) {
            controller = controller.split('.')[1]
        }
        for (var j = 0; j < directiveMap.length; j++) {
            if ((directiveMap[j].instance === item.instance) && (directiveMap[j].controller === controller) && (directiveMap[j].directive === item.command)) {
                return directiveMap[j]
            }
        }
        return ""
    }
    
    function propkey(dirItem) {
        try {
            if (dirItem.instance!==undefined) {
                return endpointId + dirItem.instance + dirItem.directive
            } 
        }
        catch {}
        return endpointId + dirItem.directive
    }
    
    if (!device) { return null }
  //                         input={<AutomationInput name="command" />} >
    return (
        <Grid item xs={props.wide ? 4 : 12 } className={classes.flex} >
            <CardLine>
                <Select className={classes.wideSelect} 
                        value={defaultOrValue()} 
                        size="small"
                        onChange={(e) => handleChangeDirectiveName(e.target.value)} >
                { directiveMap.map( dirItem => 
                    <MenuItem key={propkey(dirItem)} value={dirItem}>{dirItem.instance ? dirItem.directive+"."+dirItem.instance.split('.')[1] : dirItem.directive}</MenuItem>
                )}
                </Select>
            </CardLine>
        </Grid>
    )
}
