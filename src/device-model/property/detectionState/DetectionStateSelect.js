import React from 'react';
import { Select } from '@mantine/core';
import useDetectionState from 'device-model/property/detectionState/useDetectionState'

const DetectionStateSelect = props => {

    const { detectionState, setDetectionState } = useDetectionState(props.endpointId, props.value, props.directive)
    const disabled = props.disabled || !props.value || !props.directive
    const selections = [
                            { value: "NOT_DETECTED", label: "Not detected"},
                            { value: "DETECTED", label: "Detected"},                            
                        ]

    return (
        <Select size="sm" disabled={disabled} 
                placeholder={'Detection State'}
                onChange={setDetectionState} 
                value={detectionState}
                data={selections}
        />
    )
}

export default DetectionStateSelect;