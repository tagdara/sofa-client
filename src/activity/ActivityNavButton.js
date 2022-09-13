import React, { useState } from 'react';
import ActivityItemMissing from 'activity/ActivityItemMissing'

import { isFavorite, deviceByEndpointId } from 'store/deviceHelpers'
import { directive } from 'store/directive'
import { useRegister } from 'store/useRegister'
import moment from 'moment';
import { Loader, NavLink } from '@mantine/core';
import { IconListDetails, IconStar, IconPlayerPlay } from '@tabler/icons';

const ActivityItem = props => {
    
    const [ launched, setLaunched] = useState(false)
    const activity = deviceByEndpointId(props.endpointId)
    const { deviceState } = useRegister(props.endpointId)

    if (!activity || !deviceState) { return <ActivityItemMissing endpointId={props.endpointId} /> }

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
        if (props.description) { return props.description }
        if (!props.activity || !props.allowEdit) { return undefined }
        if (props.showNextRun) { return scheduleSummary() }
        return partsSummary()
    }    

    function loading() {
        if (launched) { return true }
        return deviceState.Running?.toggleState?.value === 'ON'
    }

    return (
        <NavLink
            label={ name } 
            icon={ isFavorite(props.endpointId) && props.icon !== "base" ? <IconStar size={16} /> : <IconListDetails size={16} /> }
            variant="light"
            description={ summary() }
            rightSection={
                loading() ?
                    <Loader size="xs" variant="dots" />
                    :
                    <IconPlayerPlay size={16} onClick={ (event) => { event.stopPropagation(); runActivity(props.endpointId) }} />  
            }
      />
    )

}

export default ActivityItem;

ActivityItem.defaultProps = {
    allowEdit: true,
    deleting: false,
}

