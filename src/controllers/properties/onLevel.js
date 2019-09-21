import React, { useEffect } from 'react';
import SmallSlider from '../../SmallSlider';

export default function OnLevel(props) {
    
    useEffect(() => {
        // Set default if passed undefined
        if (props.interface.onLevel.value===undefined) {
            if (props.interface.hasOwnProperty('setDefault')) {
                props.interface.setDefault(100)
            }
        }
    }, [props.interface])
    
    function handleOnLevelChange(event) {
        props.interface.directive('SetOnLevel', { "onLevel" : event })
    }; 

    return (
        <SmallSlider
            value={ props.interface.onLevel.value } unit={"%"}
            min={0} max={100} step={10}
            change={ handleOnLevelChange }
        />
    );
}

