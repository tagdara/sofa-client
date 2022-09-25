import React from 'react';
import {  Group, Stack, Text } from '@mantine/core'
import usePowerState from 'endpoint-model/property/powerState/usePowerState'
import PowerStateAvatar from 'endpoint-model/property/powerState/PowerStateAvatar'
import { friendlyNameByEndpointId } from 'endpoint-model/discovery'
import TelevisionDetailLine from 'devices/Television/TelevisionDetailLine'
import useLayoutStore from 'layout/layoutStore'
import TelevisionPullUp from 'devices/Television/TelevisionPullUp'
import { IconDeviceTv, IconDeviceTvOff } from '@tabler/icons';

const Television = props => {
  
    const { powerStateBool: on } = usePowerState(props.endpointId)
    const name = friendlyNameByEndpointId(props.endpointId) 
    const setStackCardHighlight = useLayoutStore( state => state.setStackCardHighlight)
    const setStackPullUp= useLayoutStore( state => state.setStackPullUp)
    const stackPullUp = useLayoutStore( state => state.stackPullUp)
    const pullUpActive = stackPullUp === name

    const showOverlay = () => {
        setStackCardHighlight(pullUpActive ? null : 'TvHero')
        setStackPullUp(pullUpActive ? null : name, {})
    }

    return (
        <>
            <Stack spacing={8}>
                <Group spacing="xl" onClick={showOverlay}>
                    <PowerStateAvatar 
                        endpointId={ props.endpointId } 
                        icon={ on ?
                            <IconDeviceTv size={24}  />  
                            :
                            <IconDeviceTvOff size={24} /> 
                            } 
                        />
                    <Stack style={{ display: "flex", flex: 1, width: "100%"}} spacing={4}>
                        <Text 
                            size={props.size ? props.size : "lg"} 
                            lineClamp={1} 
                            style={{ flexGrow: 1 }}
                        >
                            {name}
                        </Text>
                        { on && <TelevisionDetailLine endpointId={props.endpointId} />  }
                    </Stack>
                </Group>
            </Stack>
        
        { pullUpActive && <TelevisionPullUp matrix={props.matrix} endpointId={props.endpointId} /> }
        </>
    );
}
//     <Collapse in={ (on && inputLabel === "Matrix") || showDetail}>
        //         <Stack>
        //             <Group noWrap grow>
        //                 <InputSelect endpointId={props.endpointId} />
        //                 { inputLabel === "Matrix" && <ModeSelect instance={"Output.Source"} endpointId={props.matrix} /> }
        //             </Group>
        //             { (on && inputLabel === "Matrix") && <MatrixConflictList endpointId={props.matrix} /> }
        //         </Stack>
        //     </Collapse>
        //     <Collapse in={showDetail}>
        //         <Stack>
        //             <Group noWrap>
        //                 <ModeSelect endpointId={props.endpointId} instance={"Power.Saving"} />
        //             </Group>
        //         </Stack>
        //     </Collapse>
        // </Stack>


export default Television;
