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
        padding: "0px 4px",
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
            if (!item) { return }
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
    const controllerInterface = getControllerInterface(device,item) 
    
    const activityPropertyDirective = (endpointId, controllerName, command, payload={}, cookie={}, instance)  => {
        updateActivityItem(props.category, props.index, payload)
    }

    const renderProps = { ...props, item: item, device: device, instance: item.instance, directive: activityPropertyDirective, interface: controllerInterface }

    if ( !device || !propertyModuleName || !item || item.operator ==='Any') { return null }

    return (
        <Grid item xs={props.wide ? 12 : 4 } className={classes.flex} >
            <ListItem >
            { renderSuspensePropertyModule(propertyModuleName, propertyModule, renderProps ) }
            </ListItem>
        </Grid>
    )
}
