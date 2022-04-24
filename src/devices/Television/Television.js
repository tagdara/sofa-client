import React, { useState } from 'react';
import CardLine from 'components/CardLine'
import { Collapse, Group } from '@mantine/core'
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

    console.log('tv on', on)

    return (
        <Group direction="column" grow spacing="lg">
            <Group direction="column" grow noWrap spacing={8}>
                <CardLine   arrow icon={ <DeviceIcon endpointId={props.endpointId} /> }
                            color={ on ? "primary" : undefined}
                            on={on}
                            primary={ name }
                            onClick={ () => setShowDetail(!showDetail)}
                >
                    <PowerStateSwitch endpointId={props.endpointId} />
                </CardLine>
                { on && <TelevisionDetailLine endpointId={props.endpointId} /> }
            </Group>
            <Collapse in={ (on && inputLabel === "Matrix") || showDetail}>
                <Group direction="column" grow>
                    <Group noWrap grow>
                        <InputSelect endpointId={props.endpointId} />
                        { inputLabel === "Matrix" && <ModeSelect instance={"Input"} endpointId={props.matrix} /> }
                    </Group>
                    { (on && inputLabel === "Matrix") && <MatrixConflictList endpointId={props.matrix} /> }
                </Group>
            </Collapse>
            <Collapse in={showDetail}>
                <Group direction="column" grow>
                    <Group noWrap>
                        <ModeSelect endpointId={props.endpointId} instance={"PowerSaving"} />
                    </Group>
                </Group>
            </Collapse>
        </Group>
    );
}

export default Television;
