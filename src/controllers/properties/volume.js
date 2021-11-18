import React, { useState, useEffect } from 'react';
import CardLineSlider from 'components/CardLineSlider';
import VolumeAvatar from 'controllers/Speaker/VolumeAvatar'

export default function Volume(props) {

    const [ displayValue, setDisplayValue ] = useState( valueOrDefault())
   
    useEffect(() => {
        if (props.item.value===undefined) {
            props.directive(props.device.endpointId, 'Speaker', 'SetVolume', { "volume" : 50 }, {}, props.item.instance)
        }
        setDisplayValue(valueOrDefault())
    // eslint-disable-next-line
    }, [props.item, props.device, props.interface])

    function valueOrDefault() {
        var val=50
        try {
            if (props.item.value.hasOwnProperty('volume')) {
                val=parseInt(props.item.value.volume)
            }
        } 
        catch {}
        return val
    }

    function handleChange(event) {
        props.directive(props.device.endpointId, 'Speaker', 'SetVolume', { "volume" : event }, {}, props.item.instance)
    }; 

    return (
        <>
            <CardLineSlider min={60} max={90} small={true}  value={ valueOrDefault() } slide={setDisplayValue} set={ handleChange } />
            <VolumeAvatar size="small" volume={ displayValue } />
        </>
    );
}

