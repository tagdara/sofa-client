import React, { useEffect } from 'react';
import SmallSlider from '../../SmallSlider';

export default function Volume(props) {
    console.log( props.interface)
    
    useEffect(() => {
        // Set default if passed undefined
        if (props.interface.volume.value===undefined) {
            if (props.interface.hasOwnProperty('setDefault')) {
                props.interface.setDefault(50)
            }
        }
    }, [props.interface])
    
    function handleVolumeChange(event) {
        props.interface.directive('SetVolume', { "volume" : event })
    }; 

    return (
        <SmallSlider
            value={ props.interface.volume.value } unit={"%"}
            min={0} max={100} step={10}
            change={ handleVolumeChange }
        />
    );
}

