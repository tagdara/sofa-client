import React, { useState } from 'react';
import dayjs from 'dayjs'
import calendar from 'dayjs/plugin/calendar' 

import { Loader, NavLink} from '@mantine/core';

import { endpointByEndpointId } from 'endpoint-model/discovery'
import { directive } from 'endpoint-model/directive/directive'
import { useRegister } from 'endpoint-model/register/useRegister'
import ActivityItemMissing from 'activity/ActivityItemMissing'
import useDefinitionController from 'endpoint-model/controller/DefinitionController/useDefinitionController'

import { IconListDetails } from '@tabler/icons';

const ActivityLink = props => {
   
    dayjs.extend(calendar)
    const [ launched, setLaunched] = useState(false)
    const activity = endpointByEndpointId(props.endpointId)
    const { deviceState } = useRegister(props.endpointId)
    const { countData, nextRun } = useDefinitionController(props.endpointId)

    if (!activity || !deviceState) { return <ActivityItemMissing endpointId={props.endpointId} /> }

    if ( props.scheduled && !nextRun) { return null }

    const name = activity.friendlyName

    function runActivity(conditions=true) {
        setLaunched(true)
        directive(props.endpointId, 'Alexa.SceneController', 'Activate', {}, {"conditions": conditions})
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

    const loading = launched || deviceState?.Running?.toggleState?.value === 'ON'

    return (
        <NavLink 
            variant="subtle" active
            icon={loading ? <Loader size="xs" variant="dots" /> : <IconListDetails size={16} />}
            label={ name }
            description={ countData['actions_count']+ " actions" }
            onClick={ loading ? undefined : () => runActivity(props.endpointId) } 
        />
    )
}

export default ActivityLink;

