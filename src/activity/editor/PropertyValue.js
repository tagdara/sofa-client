import React, { useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import ListItem from '@mui/material/ListItem';
import Grid from '@mui/material/Grid';

import { propertyFromDirective } from 'store/directive'
import { deviceByEndpointId, getControllerInterface }  from 'store/deviceHelpers'
import { updateActivityItem,  loadPropertyModule, renderSuspensePropertyModule } from 'store/activityEditorHelpers'
import useActivityEditorStore from 'store/activityEditorStore'

const useStyles = makeStyles({
        
    flex: {
        display: "flex",
        alignItems: "center",
    },
 
});

export default function PropertyValue(props) {
    
    const classes = useStyles();
    const [propertyModule, setPropertyModule] = useState(undefined)
    const [propertyModuleName, setPropertyModuleName] = useState(undefined)
    const item = useActivityEditorStore(state => state.activity[props.category][props.index] )

    useEffect(() => {

        try {
            if (!item) { 
                setPropertyModule(undefined) 
                setPropertyModuleName(undefined)
                return undefined
            }
            var propertyName = item.propertyName
            if (!propertyName) {
                propertyName = propertyFromDirective(item.controller, item.command)
            }
            
            if (propertyName !== propertyModuleName) {
                setPropertyModuleName(propertyName)
                const loadedPropertyModule = loadPropertyModule(propertyName)
                setPropertyModule( loadedPropertyModule )
            }
        }
        catch {}
    // eslint-disable-next-line
    }, [ item ])    

    if (!item) { return null }

    const endpointId = item.endpointId
    const device = endpointId ? deviceByEndpointId(endpointId) : undefined
 
    if ( !device || !propertyModuleName || !item || item.operator ==='Any') { return null }

    const controllerInterface = getControllerInterface(device,item) 

    const conditionPropertyDirective = (endpointId, controllerName, command, payload={}, cookie={}, instance)  => {
        const update = {    type: item.type,
                            endpointId: endpointId, 
                            controller: controllerName, 
                            propertyName: item.propertyName, 
                            operator: item.operator, 
                            value: payload[item.propertyName]
                    }
        updateActivityItem( props.category, props.index, update)
    }

    const activityPropertyDirective = (endpointId, controllerName, command, payload={}, cookie={}, instance)  => {
        const update = {    type: item.type,
                            endpointId: endpointId, 
                            controller: controllerName, 
                            command: command, 
                            value: payload
                    }
        updateActivityItem(props.category, props.index, update)
    }

    const renderProps = { ...props, 
                            item: item, 
                            device: device, 
                            instance: item.instance, 
                            directive: item.type==="property" ? conditionPropertyDirective : activityPropertyDirective, 
                            interface: controllerInterface 
                        }

    return (
        <Grid item xs={props.wide ? 4 : 12 } className={classes.flex} >
            <ListItem >
            { renderSuspensePropertyModule(propertyModuleName, propertyModule, renderProps ) }
            </ListItem>
        </Grid>
    )
}
