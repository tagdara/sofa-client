import React, { useState, useEffect } from 'react';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Star';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import CloseIcon from '@mui/icons-material/Close';
import ListIcon from '@mui/icons-material/List';

import ItemBase from "components/ItemBase"
import CardLine from 'components/CardLine'
import CardLineText from 'components/CardLineText'
import CardLineIcon from 'components/CardLineIcon'
import ActivityItemMissing from 'activity/ActivityItemMissing'

import { isFavorite, makeFavorite, register, unregister, deviceByEndpointId } from 'store/deviceHelpers'
import { directive } from 'store/directive'

import useDeviceStateStore from 'store/deviceStateStore'
import moment from 'moment';


const ActivityItem = props => {
    
    const [ launched, setLaunched] = useState(false)
    const activity = deviceByEndpointId(props.endpointId)
    const activityState = useDeviceStateStore( state => state.deviceStates[props.endpointId] )

    useEffect(() => {
        register(props.endpointId, "Activity-"+props.endpointId)
        return function cleanup() {
            unregister(props.endpointId, "Activity-"+props.endpointId)
        };
    // eslint-disable-next-line 
    }, [props.endpointId])

    if (!activity || !activityState) { return <ActivityItemMissing endpointId={props.endpointId} /> }

    const name = activity.friendlyName

    function runActivity(conditions=true) {
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


    function partsSummary() {
        var parts = ['triggers_count', 'conditions_count', 'actions_count', 'schedules_count']
        var results = parts.map(part => { if (props.activity[part] > 0)  { return props.activity[part]+" "+part.split("_")[0] } return undefined })
        return results.filter(Boolean).join(" / ")
    }    
 
    function scheduleSummary() {
        if (props.activity.next_run) { return moment(props.activity.next_run).calendar() }
        return undefined
    }

    function summary() {
        if (!props.activity || !props.allowEdit) { return undefined }
        if (props.showNextRun) { return scheduleSummary() }
        return partsSummary()
    }    

    function loading() {
        if (launched) { return true }
        return activityState.Running.toggleState.value === 'ON'
    }

    return (
        <ItemBase small={ true } highlight={props.highlight}>
            <CardLine  onClick={ () => props.select(props.endpointId) }>
                <CardLineIcon color={props.favorite ? "primary" : undefined } 
                                loading={loading()} 
                                onClick={(event) => { event.stopPropagation(); makeFavorite(props.endpointId, !props.favorite)}}>
                    { isFavorite(props.endpointId) && props.icon !== "base" ? <FavoriteIcon/> : <ListIcon /> }
                </CardLineIcon>
            <CardLineText primary={name} secondary={ summary() } />
            { props.deleting ?
                <IconButton size={"small"} onClick={ () => props.delete(props.endpointId) } >
                    <CloseIcon />
                </IconButton>
            :
                <IconButton disabled={ loading() } size={"small"} onClick={ () => runActivity(props.endpointId) } >
                    <PlayArrowIcon />
                </IconButton>                
            }
            </CardLine>
        </ItemBase>
    );
}

export default ActivityItem;

ActivityItem.defaultProps = {
    allowEdit: true,
    deleting: false,
}

