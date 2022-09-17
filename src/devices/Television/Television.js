import React, { useState } from 'react';
import CardLine from 'components/CardLine'
import { Collapse, Group, Stack } from '@mantine/core'
import DeviceIcon from 'components/DeviceIcon'
import usePowerState from 'device-model/property/powerState/usePowerState'
import useInput from 'device-model/property/input/useInput'
import PowerStateSwitch from 'device-model/property/powerState/PowerStateSwitch'
import InputSelect from 'device-model/property/input/InputSelect'
import { friendlyNameByEndpointId } from 'store/deviceHelpers'
import TelevisionDetailLine from 'devices/Television/TelevisionDetailLine'
import ModeSelect from 'device-model/property/mode/ModeSelect'
import MatrixConflictList from 'devices/Matrix/MatrixConflictList'

const Television = props => {
  
    const [ showDetail, setShowDetail ] = useState(false);
    const { powerStateBool: on } = usePowerState(props.endpointId)
    const name = friendlyNameByEndpointId(props.endpointId) 
    const { inputLabel } = useInput(props.endpointId)

    return (
        <Stack spacing="lg">
            <Stack spacing={8}>
                <CardLine   arrow icon={ <DeviceIcon endpointId={props.endpointId} /> }
                            color={ on ? "primary" : undefined}
                            on={on}
                            primary={ name }
                            onClick={ () => setShowDetail(!showDetail)}
                >
                    <PowerStateSwitch endpointId={props.endpointId} />
                </CardLine>
                { on && <TelevisionDetailLine endpointId={props.endpointId} /> }
            </Stack>
            <Collapse in={ (on && inputLabel === "Matrix") || showDetail}>
                <Stack>
                    <Group noWrap grow>
                        <InputSelect endpointId={props.endpointId} />
                        { inputLabel === "Matrix" && <ModeSelect instance={"Output.Source"} endpointId={props.matrix} /> }
                    </Group>
                    { (on && inputLabel === "Matrix") && <MatrixConflictList endpointId={props.matrix} /> }
                </Stack>
            </Collapse>
            <Collapse in={showDetail}>
                <Stack>
                    <Group noWrap>
                        <ModeSelect endpointId={props.endpointId} instance={"Power.Saving"} />
                    </Group>
                </Stack>
            </Collapse>
        </Stack>
    );
}

export default Television;
