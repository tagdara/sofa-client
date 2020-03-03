import React, { useEffect } from 'react';
import {withStyles } from '@material-ui/styles';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputBase from '@material-ui/core/InputBase';


const BootstrapInput = withStyles(theme => ({
    input: {
        minWidth: '100px',
        borderRadius: 4,
        position: 'relative',
        backgroundColor: theme.palette.background.paper,
        border: '1px solid #ced4da',
        fontSize: 16,
        padding: '10px 26px 10px 12px',
        transition: theme.transitions.create(['border-color', 'box-shadow']),
        '&:focus': {
            borderRadius: 4,
            borderColor: '#80bdff',
            boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
        },
    },
}))(InputBase);

export default function PowerState(props) {
    
    console.log('props item', props.item)

    useEffect(() => {
        if (props.item.value===undefined) {
            props.directive(props.device.endpointId, 'PowerController', 'TurnOn', { "powerState" : "ON" }, {}, props.item.instance)
        }
    // eslint-disable-next-line
    }, [props.item, props.device, props.interface])

    
    function handleChange(e) {
        
        console.log('changing',props.device.endpointId, 'PowerController', e.target.value ==='ON' ? 'TurnOn' : 'TurnOff' , { "powerState" : e.target.value }, {}, props.item.instance)

        props.directive(props.device.endpointId, 'PowerController', e.target.value ==='ON' ? 'TurnOn' : 'TurnOff' , { "powerState" : e.target.value }, {}, props.item.instance)
    }
    
    function getValue() {
        if (props.item.value!==undefined) {
            if (props.item.value.powerState==='ON' || props.item.value.powerState==='OFF') { return props.item.value.powerState }
        }
        if (props.item.command==='TurnOn') {return 'ON'}
        if (props.item.command==='TurnOn') {return 'OFF'}
        return ''
    }
    
    return (
        <Select value={getValue()} onChange={handleChange} input={<BootstrapInput name="powerState" id="powerState" />} >
            <MenuItem value=""><em>Choose a property</em></MenuItem>
            <MenuItem value="ON">ON</MenuItem>
            <MenuItem value="OFF">OFF</MenuItem>
        </Select>
    );

}


