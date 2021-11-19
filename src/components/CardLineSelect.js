import React from 'react';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

const CardLineSelect = props => {

    if (!props.selections) { return null}
    
    return (
        <Select disabled = {props.disabled }
                sx = {{ minWidth: "50%" }} 
                displayEmpty 
                variant = {"standard"}
                value = { props.value ? props.value : "" } 
                onChange = { (event) => props.choose(event.target.value) } 
        >
            { props.selections.map( item => 
                <MenuItem key = { typeof item === 'string' ? item : item.value } value={ typeof item === 'string' ? item :item.value }>
                    { typeof item === 'string' ? item : item.name }
                </MenuItem>
            )}
        </Select>
    )
}

export default CardLineSelect