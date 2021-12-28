import React from 'react';
import { Select } from '@mantine/core';

export default function TimeEntry(props) {

    const selections = [
        { value: "sunrise", label: "Sunrise"},
        { value: "sunset", label: "Sunset"},
        { value: "custom", label: "Custom"}
    ]

    return (
        <Select size="sm" 
            onChange={props.select} 
            value={props.value}
            data={selections}
        />
    );
}