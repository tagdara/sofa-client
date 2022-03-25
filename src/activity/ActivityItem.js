import React, { useState, useEffect } from 'react';
import moment from 'moment';

import { removeFavorite, makeFavorite, register, unregister, deviceByEndpointId } from 'store/deviceHelpers'
import { directive } from 'store/directive'
import useDeviceStateStore from 'store/deviceStateStore'
import useUserStore from 'store/userStore'

import { X as Close, List, Star, PlayCircle } from 'react-feather'

import { ActionIcon, Badge, Group } from '@mantine/core';

import { SplitButtonGroup, SplitButton } from 'components/SplitButton'
import ActivityItemMissing from 'activity/ActivityItemMissing'
import ActivityComponentIcon from 'activity/ActivityComponentIcon'

const ActivityItem = props => {
    

    const [ launched, setLaunched] = useState(false)
    const activity = deviceByEndpointId(props.endpointId)
    const activityState = useDeviceStateStore( state => state.deviceStates[props.endpointId] )
    const favorites = useUserStore( state => state.preferences.favorites )
    const favorite = favorites && favorites.includes(props.endpointId)

    useEffect(() => {
        register(props.endpointId, "Activity-"+props.endpointId)
        return function cleanup() {
            unregister(props.endpointId, "Activity-"+props.endpointId)
        };
    // eslint-disable-next-line 
    }, [props.endpointId])

    if (!activity || !activityState) { return <ActivityItemMissing endpointId={props.endpointId} /> }

    const name = activity.friendlyName

    function toggleFavorite() {
        if (!favorite) {
            makeFavorite(props.endpointId) 
        } else {
            removeFavorite(props.endpointId)
        }
    }

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
        var parts = ['schedules_count', 'triggers_count', 'conditions_count', 'actions_count', 'missing_devices_count']
        var results = parts.map(part => 
            { 
                if (props.activity[part] > 0)  { 
                    return (
                        <ActivityComponentIcon key={props.activity.name+part} text={props.activity[part]} component={part} />
                    )
                } 
                return false
            }
        )
        results = results.filter(Boolean)
        if (!results ||  results.length<1) {  return <Badge color="red">{"Empty"}</Badge> }
        return results
    }    
 
    function scheduleSummary() {
        if (props.activity.next_run) { return moment(props.activity.next_run).calendar() }
        return undefined
    }

    function xsummary() {
        if (!props.activity || !props.allowEdit) { return null}
        if (props.showNextRun) { return scheduleSummary() }
        const summary = partsSummary()
        if (summary.length < 1) { return null }
        return  (
            <Group noWrap spacing={4}>
                { summary }
            </Group>
        )
    }    

    const loading = launched || activityState.Running.toggleState.value === 'ON'

    return (
        <SplitButtonGroup>
            <SplitButton >         
                <ActionIcon variant={ favorite ? "light" : undefined} 
                            color={favorite ? "green" : undefined } 
                            onClick={ () => toggleFavorite(props.endpointId) }
                >
                    { (favorite && props.icon !== "base") ? <Star size={20} /> : <List size={20} /> }
                </ActionIcon>
            </SplitButton>
            <SplitButton    label = { name } 
                            secondary = { xsummary() }
                            onClick={ () => props.select(props.endpointId) }
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

