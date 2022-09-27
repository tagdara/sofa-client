import React from 'react';
import { friendlyNameByEndpointId } from 'endpoint-model/discovery'
import ModeLine from 'endpoint-model/property/mode/ModeLine'
import MutedLine from 'endpoint-model/property/muted/MutedLine'
// import usePowerState from 'endpoint-model/property/powerState/usePowerState'
import InputSelectLine from 'endpoint-model/property/input/InputSelectLine'
import useInput from 'endpoint-model/property/input/useInput'
import useMode from 'endpoint-model/property/mode/useMode'
import useLayoutStore from 'layout/layoutStore'
import PullUpCard from 'layout/pullup/PullUpCard'
import { ActionIcon, Divider, Stack } from '@mantine/core'
import { IconDeviceSpeaker, IconRecharging, IconDeviceDesktop, IconChartCandle } from '@tabler/icons';
import MatrixConflictList from 'devices/Matrix/MatrixConflictList'
import usePowerState from 'endpoint-model/property/powerState/usePowerState'
import TelevisionLightControls from 'devices/Television/TelevisionLightControls'

const TelevisionPullUp = props => {

    // const { powerStateBool: on } = usePowerState(props.endpointId)
    const matrixInstance = "Output.Source"
    const name = friendlyNameByEndpointId(props.endpointId) 
    const stackPullUp = useLayoutStore( state => state.stackPullUp)
    const { inputLabel } = useInput(props.endpointId)
    const { modeLabel: audioOutput } = useMode(props.endpointId, "Audio.Output")
    const { powerStateBool: on } = usePowerState(props.endpointId)
    const currentHour = new Date().getHours();
    const night = currentHour >= 17 || currentHour <= 6

    console.log("aud", audioOutput)

    return (
        <PullUpCard title={name} name={name} mounted={ stackPullUp === name } >
            <Stack spacing="lg">
            <InputSelectLine 
                icon={<ActionIcon>
                        <IconChartCandle size={20} />
                    </ActionIcon>
                }
                endpointId={props.endpointId} 
            />
            { (on && inputLabel === "Matrix") && 
                <ModeLine 
                    icon={
                        <ActionIcon>
                            <IconDeviceDesktop size={20} />
                        </ActionIcon>
                    }
                    label={"Matrix Input"} 
                    endpointId={props.matrix} 
                    instance={matrixInstance} 
                />
            }
            { (on && inputLabel === "Matrix") && 
                <MatrixConflictList endpointId={props.matrix} /> 
            }
            <ModeLine 
                icon={
                    <ActionIcon>
                        <IconDeviceSpeaker size={20} />
                    </ActionIcon>
                }
                endpointId={props.endpointId}
                instance={"Audio.Output"}
            />
            { audioOutput === "TV" &&
                <MutedLine endpointId={props.endpointId} />
            }
            <ModeLine 
                icon={
                    <ActionIcon>
                        <IconRecharging size={20} />
                    </ActionIcon>
                }
                endpointId={props.endpointId} 
                instance={"Power.Saving"}
            />
            { ( on && night ) &&
                <>
                    <Divider />
                    <TelevisionLightControls endpointId={props.endpointId}  />
                </>
            }   
            </Stack>
        </PullUpCard>
    );
}

export default TelevisionPullUp;
