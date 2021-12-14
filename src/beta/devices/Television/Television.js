import React, { useState, useEffect } from 'react';
import CardLine from 'beta/components/CardLine'
import useDeviceStateStore from 'store/deviceStateStore'
import { directive } from 'store/directive'
import { getInputs, register, unregister, deviceByEndpointId } from 'store/deviceHelpers'
import { Card, Group, Select, Switch } from '@mantine/core'
import { Tv as TvIcon } from 'react-feather'

const Television = props => {
  
    const [ showDetail, setShowDetail ] = useState(false);
    const device = deviceByEndpointId(props.endpointId)
    const tv = useDeviceStateStore( state => state.deviceStates[props.endpointId] )

    useEffect(() => {
        register(props.endpointId, 'tv-'+props.endpointId)
        return function cleanup() {
            unregister(props.endpointId, 'tv-'+props.endpointId);
        };
    // eslint-disable-next-line 
    }, [props.endpointId])

    if (!tv) { return null }

    const on = tv.PowerController.powerState.value === 'ON' 
    //const volume = tv.Speaker.volume.value
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
        <Card style={{ width: "100%" }}>
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
                { (showDetail || on ) &&
                    <Select
                        size="md"
                        placeholder="Input"
                        value={ tv.InputController.input.value }
                        onChange={ handleInput }
                        data={ inputSelect() }
                    />    
                }
            </Group>
        </Card>
    );
}

export default Television;
