import React, { useEffect } from 'react';
import SmallSlider from 'components/SmallSlider';

export default function OnLevel(props) {

    useEffect(() => {
        if (props.item.value===undefined) {
            props.directive(props.device.endpointId, 'OnLevelController', 'SetOnLevel', { "onLevel" : 80 }, {}, props.item.instance)
        }
    // eslint-disable-next-line
    }, [props.item, props.device, props.interface])

    function handleOnLevelChange(event) {
        props.directive(props.device.endpointId, 'OnLevelController', 'SetOnLevel', { "onLevel" :  event }, {}, props.item.instance)
 
    }; 
    
    function valueOrDefault() {
        var val=50
        try {
            if (props.item.value.hasOwnProperty('onLevel')) {
                val=parseInt(props.item.value.onLevel)
            }
        } 
        catch {}
        return val
    }

    return (
        <SmallSlider
            value={ valueOrDefault() } unit={"%"}
            min={0} max={100} step={10}
            change={ handleOnLevelChange }
        />
    );
}

