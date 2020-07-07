import React, {  useContext } from 'react';
import { makeStyles } from '@material-ui/styles';
import { DeviceContext } from '../DataContext/DeviceProvider';
import ListItem from '@material-ui/core/ListItem';
import AutomationInput from './AutomationInput';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles({

    flex: {
        display: "flex",
        height: 72,
        alignItems: "center",
    },
    wideSelect: {
        width: "100%",
    }
});

export default function DeviceDirective(props) {
    
    const classes = useStyles();
    const { directives, deviceDirectives } = useContext(DeviceContext);
    const directiveMap = deviceDirectives(props.device)

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
        props.save(props.index, {...props.item, propertyName: propertyName, controller:newval.controller, command:newval.directive, instance: newval.instance, value: undefined})
    }
    
    function defaultOrValue() { 
        for (var j = 0; j < directiveMap.length; j++) {
            if ((directiveMap[j].instance===props.item.instance) && (directiveMap[j].controller===props.item.controller) && (directiveMap[j].directive===props.item.command)) {
                return directiveMap[j]
            }
        }
        return ""
    }
    
    function propkey(dirItem) {
        try {
            if (dirItem.instance!==undefined) {
                return props.device.endpointId+dirItem.instance+dirItem.directive
            } 
        }
        catch {}
        return props.device.endpointId+dirItem.directive
    }

    return (
        props.device!==undefined ?
            <Grid item xs={props.wide ? 12 : 4 } className={classes.flex} >
                <ListItem>
                    <Select className={classes.wideSelect} value={defaultOrValue()} onChange={(e) => handleChangeDirectiveName(e.target.value)} 
                            input={<AutomationInput name="command" />} >
                    { directiveMap.map( dirItem => 
                        <MenuItem key={propkey(dirItem)} value={dirItem}>{dirItem.instance ? dirItem.directive+"."+dirItem.instance.split('.')[1] : dirItem.directive}</MenuItem>
                    )}
                    </Select>
                </ListItem>
            </Grid>
        :
        null
    )
}
