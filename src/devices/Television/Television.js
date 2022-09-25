import React, { useState } from 'react';
import CardLine from 'layout/components/CardLine'
import { Collapse, Group, Stack } from '@mantine/core'
import EndpointIcon from 'endpoint-model/endpoint/EndpointIcon'
import usePowerState from 'endpoint-model/property/powerState/usePowerState'
import useInput from 'endpoint-model/property/input/useInput'
import PowerStateSwitch from 'endpoint-model/property/powerState/PowerStateSwitch'
import InputSelect from 'endpoint-model/property/input/InputSelect'
import { friendlyNameByEndpointId } from 'endpoint-model/discovery'
import TelevisionDetailLine from 'devices/Television/TelevisionDetailLine'
import ModeSelect from 'endpoint-model/property/mode/ModeSelect'
import MatrixConflictList from 'devices/Matrix/MatrixConflictList'
import useLayoutStore from 'layout/layoutStore'
import TelevisionPullUp from 'devices/Television/TelevisionPullUp'

const Television = props => {
  
    const [ showDetail, setShowDetail ] = useState(false);
    const { powerStateBool: on } = usePowerState(props.endpointId)
    const name = friendlyNameByEndpointId(props.endpointId) 
    const { inputLabel } = useInput(props.endpointId)

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
                <CardLine   arrow icon={ <EndpointIcon endpointId={props.endpointId} /> }
                            color={ on ? "primary" : undefined}
                            on={on}
                            primary={ name }
                            onClick={showOverlay}
                >
                    <PowerStateSwitch endpointId={props.endpointId} />
                </CardLine>
                { on && <TelevisionDetailLine endpointId={props.endpointId} /> }
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
