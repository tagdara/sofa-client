import React, { useState } from 'react';
import { Select } from '@mantine/core';

export default function TimeEntry(props) {

    const [timeType, setTimeType] = useState("custom")

    const selections = [
        { value: "sunrise", label: "Sunrise"},
        { value: "sunset", label: "Sunset"},
        { value: "custom", label: "Custom"}
    ]

    return (
        <Select size="sm" 
            onChange={setTimeType} 
            value={timeType}
            data={selections}
        />
    );
}