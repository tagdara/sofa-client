import React, { useState, useEffect } from 'react';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Star';
import ListIcon from '@material-ui/icons/List';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import CloseIcon from '@material-ui/icons/Close';
import ClearIcon from '@material-ui/icons/Clear';
import CloudOffIcon from '@material-ui/icons/CloudOff';

import ItemBase from "components/ItemBase"
import ListItemIcon from '@material-ui/core/ListItemIcon';
import CardLine from 'components/CardLine'
import CardLineText from 'components/CardLineText'
import CardLineIcon from 'components/CardLineIcon'
import { isFavorite, removeFavorite, makeFavorite, register, unregister, deviceByEndpointId } from 'store/deviceHelpers'
import { directive } from 'store/directive'
import useDeviceStateStore from 'store/deviceStateStore'


const AutomationItem = props => {
    
    const [ launched, setLaunched] = useState(false)
    const automation = deviceByEndpointId(props.endpointId)
    const automationState = useDeviceStateStore( state => state.deviceStates[props.endpointId] )

    useEffect(() => {
        register(props.endpointId, "Automation-"+props.endpointId)
        return function cleanup() {
            unregister(props.endpointId, "Automation-"+props.endpointId)
        };
    // eslint-disable-next-line 
    }, [props.endpointId])

    if (!automationState) {
        if (!isFavorite(props.endpointId)) { return null }
        return <ItemBase small={ props.small } highlight={props.highlight}>
                    <CardLine>
                        <ListItemIcon><CloudOffIcon /></ListItemIcon>
                        <CardLineText primary={"Missing: "+props.endpointId} />
                        <IconButton onClick={ () => removeFavorite(props.endpointId) } size={"small"}>
                            <ClearIcon />
                        </IconButton>
                    </CardLine>
                </ItemBase>
    
    }

    const name = automation.friendlyName

    function runAutomation(conditions=true) {
        setLaunched(true)
        directive(props.endpointId, 'SceneController', 'Activate', {}, {"conditions": conditions})
            .then(result=> { parseResult(result) })
    }

    function parseResult(result) {
        try {
            if (result.event.header.name === 'ErrorResponse') {
                props.showResult(result.event.payload.message,'error')
            }
            if (result.event.header.name==='ActivationStarted') {
                props.showResult('Activation started','success')
            }
        }
        catch {}
        checkLaunch(result)
    }

    function checkLaunch(response) {
        setTimeout(function() {
            setLaunched(false)
        }, 500)
    }


    function summary() {
        if (!props.automation || !props.allowEdit) { return undefined }
        var parts = ['triggers', 'conditions', 'actions']
        var results = parts.map(part => { if (props.automation && props.automation[part].length > 0)  { return props.automation[part].length+" "+part } return undefined })
        return results.filter(Boolean).join(" / ")
    }    

    function loading() {
        if (launched) { return true }
        return automationState.Running.toggleState.value === 'ON'
    }

    return (
        <ItemBase small={ props.small } highlight={props.highlight} onClick={ () => props.select(props.endpointId) }>
            <CardLine>
                <CardLineIcon color={props.favorite ? "primary" : undefined } loading={loading()} onClick={(event) => { event.stopPropagation(); makeFavorite(props.endpointId, !props.favorite)}}>
                    { props.favorite && props.icon !== "base" ? <FavoriteIcon/> : <ListIcon /> }
                </CardLineIcon>
            <CardLineText primary={name} secondary={ summary() } />
            { props.deleting ?
                <IconButton size={"small"} onClick={ () => props.delete(props.endpointId) } >
                    <CloseIcon />
                </IconButton>
            :
                <IconButton disabled={ loading() } size={"small"} onClick={ () => runAutomation(props.endpointId) } >
                    <PlayArrowIcon />
                </IconButton>                
            }
            </CardLine>
        </ItemBase>
    );

}

export default AutomationItem;

AutomationItem.defaultProps = {
    launcher: false,
    allowEdit: true,
    deleting: false,
    small: true,
}

