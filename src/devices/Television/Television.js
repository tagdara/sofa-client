import React, { useState } from 'react';
import CardLine from 'components/CardLine'
import { Collapse, Group } from '@mantine/core'
import DeviceIcon from 'components/DeviceIcon'
import usePowerState from 'device-model/property/powerState/usePowerState'
import PowerStateSwitch from 'device-model/property/powerState/PowerStateSwitch'
import InputSelect from 'device-model/property/input/InputSelect'
import { friendlyNameByEndpointId } from 'store/deviceHelpers'

const Television = props => {
  
    const [ showDetail, setShowDetail ] = useState(false);
    const { powerStateBool: on } = usePowerState(props.endpointId)
    const name = friendlyNameByEndpointId(props.endpointId) 

    return (
            <Group direction="column" grow>
                <CardLine   avatar={ <DeviceIcon endpointId={props.endpointId} /> }
                            primary={ name }
                            onClick={ () => setShowDetail(!showDetail)}
                            color={ on ? "primary" : undefined }
                >
                    <PowerStateSwitch endpointId={props.endpointId} />
                </CardLine>
                <Collapse in={showDetail || on}>
                    <InputSelect endpointId={props.endpointId} />
                </Collapse>
            </Group>
    );
}

export default Television;
