import React, { useState } from 'react';
import dayjs from 'dayjs'

import { Badge, Button, Group, Loader, Stack, Text } from '@mantine/core';

import { endpointByEndpointId } from 'endpoint-model/discovery'
import { directive } from 'endpoint-model/directive/directive'
import { useRegister } from 'endpoint-model/register/useRegister'
import useUserStore from 'user/userStore'
import ActivityItemMenu from 'activity/ActivityItemMenu'
import ActivityItemMissing from 'activity/ActivityItemMissing'
import ActivityComponentIcon from 'activity/ActivityComponentIcon'
import useDefinitionController from 'endpoint-model/controller/DefinitionController/useDefinitionController'

import { IconListDetails, IconStar, IconPlayerPlay } from '@tabler/icons';

const ActivityItem = props => {
    
    const [ launched, setLaunched] = useState(false)
    const activity = endpointByEndpointId(props.endpointId)
    const { deviceState } = useRegister(props.endpointId)
    const { countData, nextRun } = useDefinitionController(props.endpointId)

    const favorites = useUserStore( state => state.preferences.favorites )
    const favorite = favorites && favorites.includes(props.endpointId)

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


    function partsSummary() {
        var results = Object.keys(countData).map(part => 
            { if (countData[part]) {
                    return <ActivityComponentIcon key={props.endpointId + part} count={countData[part]} component={part} /> 
                } else { return null }
            })
        results = results.filter(n => n)
        if (!results || results.length < 1 ) {  return <Badge size="sm" color="red">{"Empty"}</Badge> }
        return results
    }    
 
    function scheduleSummary() {
        if (nextRun) { return dayjs(nextRun).calendar() }
        return undefined
    }

    function xsummary() {
        if ( !activity || props.disableEdit ) { return null }
        if (props.showNextRun) { return scheduleSummary() }
        const summary = partsSummary()
        if (summary.length < 1) { return null }
        return  (
            <Group noWrap spacing={4}>
                { summary }
            </Group>
        )
    }   

    const loading = launched || deviceState?.Running?.toggleState?.value === 'ON'

    return (
        <Button.Group  buttonBorderWidth={0} style={{ width: "100%"}}>
            <ActivityItemMenu
                delete={props.delete}
                run={runActivity}
                endpointId={props.endpointId}
                target={   
                    <Button 
                        radius="md"
                        size="md"
                        styles={{ 
                            root: {
                                border: 0,
                                display: "flex",
                                justifyContent: "flex-start",
                                paddingLeft: 16,
                                height: 58,
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                            }
                        }}
                        variant={ favorite ? "light" : "default" }
                    >
                        { (favorite && props.icon !== "base") ? <IconStar size={20} /> : <IconListDetails size={20} /> }
                    </Button>         
                    }     
            />     
            <Button 
                buttonBorderWidth={0}
                size="md"
                styles={{ 
                    root: {          
                        border: 0,
                        display: "flex",
                        justifyContent: "flex-start",
                        height: 58,
                        overflow: "hidden",
                        padding: "0 12px",
                    }
                }}
                variant={favorite ? "light" : "default" }
                fullWidth 
                onClick={ () => props.select(props.endpointId) }
            >
                <Stack spacing={4}>
                    <Text size={"sm"}>
                        { name }
                    </Text>
                    <Group noWrap>
                        { xsummary() }
                    </Group>
                </Stack>
            </Button> 
            <Button 
                radius="md"
                size="md"
                styles={{ 
                    root: {
                        border: 0,
                        height: 58,
                        padding: 12,
                    }
                }}
                variant={ favorite ? "light" : "default" }
                onClick={ loading ? undefined : () => runActivity(props.endpointId) } 
            >
                {loading ? <Loader size="xs" variant="dots" /> :  <IconPlayerPlay size={20} /> }
            </Button> 
        </Button.Group>
    )
}

export default ActivityItem;

