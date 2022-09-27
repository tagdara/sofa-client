import React from 'react';
import CardLine from 'layout/components/CardLine'
import EndpointIcon from 'endpoint-model/endpoint/EndpointIcon'
import { friendlyNameByEndpointId } from 'endpoint-model/discovery'
import PowerStateSwitch from 'endpoint-model/property/powerState/PowerStateSwitch'
import VolumeSlider from 'endpoint-model/property/volume/VolumeSlider'
import usePowerState from 'endpoint-model/property/powerState/usePowerState'
import ReceiverDetailLine from 'devices/Receiver/ReceiverDetailLine'
import useLayoutStore from 'layout/layoutStore'
import { Collapse, Stack } from '@mantine/core'
import ReceiverPullUp from 'devices/Receiver/ReceiverPullUp'


const Receiver = props => {

    const { powerStateBool: on } = usePowerState(props.endpointId)
    const name = friendlyNameByEndpointId(props.endpointId) 

    const volumePresets = [40, 55, 60, 65, 70, 80];
    const marks = volumePresets.map( vol => ({ value: vol, label: vol}))

    const setStackCardHighlight = useLayoutStore( state => state.setStackCardHighlight)
    const setStackPullUp= useLayoutStore( state => state.setStackPullUp)
    const stackPullUp = useLayoutStore( state => state.stackPullUp)
    const pullUpActive = stackPullUp === name

    const showOverlay = () => {
        setStackCardHighlight(pullUpActive ? null : 'ReceiverHero')
        setStackPullUp(pullUpActive ? null : name, {})
    }

    return (
        <>
        <Stack spacing="xl">
            <Stack spacing={8}>
                <CardLine   arrow icon={ <EndpointIcon endpointId={props.endpointId} /> }
                            color={ on ? "primary" : undefined}
                            on={on}
                            primary={ name }
                            onClick={showOverlay}
                >
                    <PowerStateSwitch endpointId={props.endpointId} />
                </CardLine>
                { on && <ReceiverDetailLine endpointId={props.endpointId} />  }
            </Stack>
            <Collapse in={ pullUpActive || on }>
                <VolumeSlider endpointId={props.endpointId} marks={marks} step={5}/>
            </Collapse>
        </Stack>

        { pullUpActive && <ReceiverPullUp endpointId={props.endpointId} /> }
        </>
);
}

export default Receiver;
