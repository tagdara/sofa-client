import React, { useState } from 'react';
import moment from 'moment';

import { removeFavorite, makeFavorite, deviceByEndpointId } from 'store/deviceHelpers'
import { directive } from 'store/directive'
import { useRegister } from 'endpoint-model/register/useRegister'
import useUserStore from 'store/userStore'

import { X as Close, List, Star, PlayCircle } from 'react-feather'

import { Badge, Button, Group, Loader, Stack, Text } from '@mantine/core';

import ActivityItemMissing from 'activity/ActivityItemMissing'
import ActivityComponentIcon from 'activity/ActivityComponentIcon'

const ActivityItem = props => {
    

    const [ launched, setLaunched] = useState(false)
    const activity = deviceByEndpointId(props.endpointId)
    const { deviceState } = useRegister(props.endpointId)

    const favorites = useUserStore( state => state.preferences.favorites )
    const favorite = favorites && favorites.includes(props.endpointId)

    if (!activity || !deviceState) { return <ActivityItemMissing endpointId={props.endpointId} /> }

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

    //console.log('activitystate', deviceState)

    const loading = launched || deviceState?.Running?.toggleState?.value === 'ON'

    return (
        <Button.Group buttonBorderWidth={0} style={{ width: "100%", border: "none"}}>
            <Button 
                size="md"
                styles={{ 
                    root: {
                        display: "flex",
                        justifyContent: "flex-start",
                        height: 58,
                        padding: 12,
                    }
                }}
                variant={ favorite ? "light" : "default" }
                onClick={ () => toggleFavorite(props.endpointId) }
            >
                { (favorite && props.icon !== "base") ? <Star size={20} /> : <List size={20} /> }
            </Button>         
            <Button 
                size="md"
                styles={{ 
                    root: {
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
                <Stack spacing={2}>
                    <Text size={"sm"}>
                        { name }
                    </Text>
                    <Group noWrap>
                        { xsummary() }
                    </Group>
                </Stack>
            </Button> 
            { props.delete ?        
                <Button 
                    size="md"
                    styles={{ 
                        root: {
                            height: 58,
                            padding: 12,
                        }
                    }}
                    variant={ favorite ? "light" : "default" }
                    onClick={ (event) => { event.stopPropagation(); props.delete(props.endpointId); }}
                >
                    <Close size={20} />
                </Button> 
                :
                <Button 
                    size="md"
                    styles={{ 
                        root: {
                            height: 58,
                            padding: 12,
                        }
                    }}
                    variant={ favorite ? "light" : "default" }
                    onClick={ loading ? undefined : () => runActivity(props.endpointId) } 
                >
                    {loading ? <Loader size="xs" variant="dots" /> :  <PlayCircle size={20} /> }
                </Button> 
            }
        </Button.Group>
    )

}

export default ActivityItem;

ActivityItem.defaultProps = {
    allowEdit: true,
    deleting: false,
}

