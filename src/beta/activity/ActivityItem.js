import React, { useState, useEffect } from 'react';
import moment from 'moment';

import { isFavorite, makeFavorite, register, unregister, deviceByEndpointId } from 'store/deviceHelpers'
import { directive } from 'store/directive'
import useDeviceStateStore from 'store/deviceStateStore'

import { X as Close, List, Star, PlayCircle } from 'react-feather'

import { ActionIcon } from '@mantine/core';

import { SplitButtonGroup, SplitButton } from 'beta/components/SplitButton'
import ActivityItemMissing from 'beta/activity/ActivityItemMissing'

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
        var results = parts.map(part => { if (props.activity[part] > 0)  { return props.activity[part]+" "+part.split("_")[0] } return false })
        results = results.filter(Boolean)
        if (!results ||  results.length<1) { return "No components"}
        return results.join(" / ")
    }    
 
    function scheduleSummary() {
        if (props.activity.next_run) { return moment(props.activity.next_run).calendar() }
        return undefined
    }

    function xsummary() {
        if (!props.activity || !props.allowEdit) { return undefined }
        if (props.showNextRun) { return scheduleSummary() }
        return partsSummary()
    }    

    const loading = launched || activityState.Running.toggleState.value === 'ON'
    const favorite = isFavorite(props.endpointId) 

    return (
        <SplitButtonGroup>
            <SplitButton >         
                <ActionIcon variant={ favorite ? "light" : undefined} 
                            color={favorite ? "green" : undefined } 
                            onClick={ () => makeFavorite(props.endpointId, !props.favorite) }
                >
                    { (isFavorite(props.endpointId) && props.icon !== "base") ? <Star size={20} /> : <List size={20} /> }
                </ActionIcon>
            </SplitButton>
            <SplitButton    label = { name } 
                            secondary = { xsummary() }
            />
            <SplitButton >
                { props.delete ?
                    <ActionIcon size={"small"} onClick={ (event) => { event.stopPropagation(); props.delete(props.endpointId); }} >
                        <Close size={20} />
                    </ActionIcon>
                :
                    <ActionIcon loading={loading} onClick={ loading ? undefined : () => runActivity(props.endpointId) } >
                        <PlayCircle size={20} />
                    </ActionIcon>                
                }
            </SplitButton>
        </SplitButtonGroup>
    );
}

export default ActivityItem;

ActivityItem.defaultProps = {
    allowEdit: true,
    deleting: false,
}

