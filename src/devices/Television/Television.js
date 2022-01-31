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
import AppleTV from 'devices/AppleTV/AppleTV'
import ModeSelect from 'device-model/property/mode/ModeSelect'
import MatrixConflictList from 'devices/Matrix/MatrixConflictList'

const Television = props => {
  
    const [ showDetail, setShowDetail ] = useState(false);
    const { powerStateBool: on } = usePowerState(props.endpointId)
    const name = friendlyNameByEndpointId(props.endpointId) 
    const { inputLabel } = useInput(props.endpointId)

    return (
        <Group direction="column" grow>
            <CardLine   arrow icon={ <DeviceIcon endpointId={props.endpointId} /> }
                        color={ on ? "primary" : undefined}
                        on={on}
                        primary={ name }
                        secondary={ on ? <TelevisionDetailLine endpointId={props.endpointId} /> : null }
                        onClick={ () => setShowDetail(!showDetail)}
            >
                <PowerStateSwitch endpointId={props.endpointId} />
            </CardLine>
            <Collapse in={on || showDetail}>
                <Group direction="column" grow>
                    <Group noWrap>
                        <InputSelect endpointId={props.endpointId} />
                        { inputLabel === "Matrix" && <ModeSelect half instance={"Input"} endpointId={props.matrix} /> }
                    </Group>
                    { inputLabel === "Matrix" && <MatrixConflictList endpointId={props.matrix} /> }
                </Group>
            </Collapse>
            <Collapse in={showDetail}>
                <Group direction="column" grow>
                    <Group noWrap>
                        <ModeSelect endpointId={props.endpointId} instance={"PowerSaving"} />
                    </Group>
                </Group>
            </Collapse>
            { ( props.appleTV && on && inputLabel==="Apple TV" ) && <AppleTV endpointId={props.appleTV} /> }
        </Group>
    );
}

export default Television;
