import React, { useEffect } from 'react';
import {withStyles } from '@mui/styles';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputBase from '@mui/material/InputBase';


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

export default function Input(props) {
    
    const inputs=getInputs()

    useEffect(() => {
        if (props.item.value===undefined) {
            props.directive(props.device.endpointId, 'InputController', 'SelectInput', { "input" : inputs[0] }, {}, props.item.instance)
        }
    // eslint-disable-next-line
    }, [props.item, props.device, props.interface])
    
    function getInputs() {
        
        var choices=[]        
        for (var k = 0; k < props.device.capabilities.length; k++) {
            if (props.device.capabilities[k].interface.endsWith('InputController')) {
                for (var j = 0; j < props.device.capabilities[k].inputs.length; j++) {
                    choices.push(props.device.capabilities[k].inputs[j].name)
                }
            }
        }

        return choices
    }    
    
    function handleInputChange(e) {
        props.directive(props.device.endpointId, 'InputController', 'SelectInput', { "input" : e.target.value }, {}, props.item.instance)
    }

    return (
        <Select value={props.item.value ? props.item.value.input : ""} onChange={handleInputChange} input={<BootstrapInput name="input" />} >
            { inputs.map( inp => 
                <MenuItem key={inp} value={inp}>{inp}</MenuItem>
            )}
        </Select>
    );

}