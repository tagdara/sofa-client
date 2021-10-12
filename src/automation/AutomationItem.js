import React, { useState, useEffect } from 'react';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Star';
import ListIcon from '@material-ui/icons/List';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import CloseIcon from '@material-ui/icons/Close';

import { deviceStatesAreEqual, dataFilter } from 'context/DeviceStateFilter'

import SofaListItem from 'components/SofaListItem';
import ItemBase from "components/ItemBase"

const AutomationItem = React.memo(props => {
    
    const [ launched, setLaunched] = useState(false)

    useEffect(() => {
        props.addEndpointIds("id", props.endpointId, "Automation-"+props.endpointId)
        return function cleanup() {
            props.unregisterDevices("Automation-"+props.endpointId);
        };
    // eslint-disable-next-line 
    }, [])

    if (!props.deviceState || !props.deviceState[props.endpointId]) { return null }
 
    const automationState = props.deviceState[props.endpointId]
    const name = props.devices[props.endpointId].friendlyName

    function runAutomation(conditions=true) {
        setLaunched(true)
        props.directive(props.endpointId, 'SceneController', 'Activate', {}, {"conditions": conditions})
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

    function makeFavorite(automation, stat) {
        // this should be part of usercontext
    }
    
    // noGrid={props.noGrid} nolist={true} noMargin={props.noMargin} noback={true} noPaper={false} button={false}
    return (
        <ItemBase small={ props.small } highlight={props.highlight}>
        <SofaListItem 
            avatar={ props.favorite && props.icon !== "base" ? <FavoriteIcon/> : <ListIcon /> }
            avatarState={props.favorite ? "on": "off" }
            avatarClick={() => makeFavorite(props.endpointId, !props.favorite)}
            labelClick={() => props.select(props.endpointId)}
            avatarBackground={ false }
            primary={ name }
            secondary={ summary() }
            small={ props.small }
            noPad={ props.small }
            loading={ loading() }
            secondaryActions={
                <>
                    { props.deleting ?
                        <IconButton size={"small"} onClick={ () => props.delete(props.endpointId) } >
                            <CloseIcon />
                        </IconButton>
                    :
                        <IconButton disabled={ loading() } size={"small"} onClick={ () => runAutomation(props.endpointId) } >
                            <PlayArrowIcon />
                        </IconButton>                
                    }
                </>
            }
        />
        </ItemBase>
    );

}, deviceStatesAreEqual);

export default dataFilter(AutomationItem);

AutomationItem.defaultProps = {
    launcher: false,
    allowEdit: true,
    deleting: false,
    small: true,
}
