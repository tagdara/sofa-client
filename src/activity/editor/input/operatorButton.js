import React from 'react';
import { Select } from '@mantine/core';

export default function OperatorButton(props) {

    const operatorList=[ '=','!=','>','>=','<','=<', ]

    function handleMenuSelect(item) {
        props.setOperator(item)
    };
    
    function operators() {
        if (props.anyOp) {
            console.log('any operators...', props.value)
            return ['Any', ...operatorList]
        }
        return operatorList
    }

    const selections = operators().map( item => { return { value: item, label: item }})

    return (
        <Select value={ props.value } 
                onChange={ handleMenuSelect }
                data={ selections }
                style={{ maxWidth: 64}}
        />
    )
}

OperatorButton.defaultProps = {
    anyOp: false,
    value: "",
}
