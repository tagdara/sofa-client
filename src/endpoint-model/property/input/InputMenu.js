import React from 'react';
import SegmentMenu from 'layout/components/SegmentMenu'
import useInput from 'endpoint-model/property/input/useInput'

export default function DeviceDirective(props) {
    
    const { inputLabel, selections, selectInput } = useInput(props.endpointId, props.value, props.directive)

    return  <SegmentMenu value={inputLabel} selections={selections} select={selectInput} />


}
