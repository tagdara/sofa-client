import React from 'react';
import { Button, Menu } from '@mantine/core'

const selections = [
    { label: "minutes", value: 'min' },
    { label: 'hours', value: 'hours' },
    { label: 'days', value: 'days' }
];

const TimeUnitButton = props => {

    function handleMenuSelect(item) {
        props.setUnit(item)
    };

    return (
        <Menu 
            control ={ <Button>{props.value ? props.value : "min"} </Button> }
        >
            { selections.map( item => 
                <Menu.Item key={item.label} onClick={ () => handleMenuSelect(item.value)}>{item.label}</Menu.Item>
            )}   
        </Menu>
    )
}

export default TimeUnitButton
