import React from 'react';
import ModeLine from 'endpoint-model/property/mode/ModeLine'
import InputSelectLine from 'endpoint-model/property/input/InputSelectLine'
import useInput from 'endpoint-model/property/input/useInput'
import useMode from 'endpoint-model/property/mode/useMode'
import { ActionIcon, Divider, Stack } from '@mantine/core'
import { IconDeviceSpeaker, IconDeviceDesktop, IconChartCandle } from '@tabler/icons';
import usePowerState from 'endpoint-model/property/powerState/usePowerState'
import TelevisionLightControls from 'devices/Television/TelevisionLightControls'
import VolumeMuteSliderLine from 'endpoint-model/property/volume/VolumeMuteSliderLine'

const ComputerTV = props => {

    // const { powerStateBool: on } = usePowerState(props.endpointId)
    const matrixInstance = "Output.Source"
    const { inputLabel } = useInput(props.endpointId)
    const { modeLabel: audioOutput } = useMode(props.endpointId, "Audio.Output")
    const { powerStateBool: on } = usePowerState(props.endpointId)
    const currentHour = new Date().getHours();
    const night = currentHour >= 17 || currentHour <= 6

    return (
            <Stack spacing="lg">
            <InputSelectLine 
                label="TV Input"
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
                <VolumeMuteSliderLine icon label="Volume" endpointId={props.endpointId} step={5}/>
            }
            { ( on && night ) &&
                <>
                    <Divider />
                    <TelevisionLightControls endpointId={props.endpointId}  />
                </>
            }   
            </Stack>
    );
}

export default ComputerTV;
