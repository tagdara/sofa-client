import React, { useState } from 'react';
import CardLine from 'beta/components/CardLine'
import { directive } from 'store/directive'
import { getInputs } from 'store/deviceHelpers'
import { Collapse, Group, Select, Switch } from '@mantine/core'
import { Tv as TvIcon } from 'react-feather'
import { useRegister } from 'store/useRegister'

const Television = props => {
  
    const [ showDetail, setShowDetail ] = useState(false);
    const { device, deviceState } = useRegister(props.endpointId)

    if (!deviceState) { return null }

    const on = deviceState.PowerController.powerState.value === 'ON' 
    //const volume = deviceState.Speaker.volume.value
    const inputs = getInputs(props.endpointId) 

    function handlePowerChange(event) {
        event.stopPropagation();
        directive(props.endpointId, 'PowerController', event.target.checked ? 'TurnOn' : 'TurnOff')
    };

    function stopEventPropagation(event) {
        // switches use onChange but onClick needs to also be blocked for nested items
        event.stopPropagation()
    }

    function inputSelect() {
       return inputs.map( inp => { return { label : inp, value : inp}})
    }

    function handleInput(inputname) {
        directive(props.endpointId,"InputController", 'SelectInput', { "input": inputname } )
    }; 

    return (
            <Group direction="column" grow>
                <CardLine   avatar={ <TvIcon /> }
                            primary={device.friendlyName}
                            onClick={ () => setShowDetail(!showDetail)}
                            color={ on ? "primary" : undefined }
                >
                    <Switch checked={ on }
                            onClick={stopEventPropagation} 
                            onChange={ handlePowerChange } 
                    />
                </CardLine>
                <Collapse in={showDetail || on}>
                    <Select
                        size="md"
                        placeholder="Input"
                        value={ deviceState.InputController.input.value }
                        onChange={ handleInput }
                        data={ inputSelect() }
                    />    
                </Collapse>
            </Group>
    );
}

export default Television;
