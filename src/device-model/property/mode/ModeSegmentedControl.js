import React from 'react';
import useMode from 'device-model/property/mode/useMode'
import CardSegmentedControl from 'components/CardSegmentedControl'

const ModeSegmentedControl = props => {

    const { mode, selections, disabled, setMode } = useMode(props.endpointId, props.instance, props.value, props.directive)

    const filteredModes = props.filter ? selections.filter( item => props.filter.includes(item.label) || props.filter.includes(item.value) ) : selections

    return (
        <CardSegmentedControl
                style={{ flexGrow: 1 }}
                size="sm"
                value={ mode }
                data={ filteredModes }
                onChange={ setMode } 
                disabled={ disabled || props.disabled }
        />                   
    );
}

export default ModeSegmentedControl
