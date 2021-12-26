import React, { useState, useEffect } from 'react';
import useDeviceStateStore from 'store/deviceStateStore'
import { directive } from 'store/directive'
import { compareState, register, unregister } from 'store/deviceHelpers'
import { Checkbox, ColorPicker, ColorSwatch, Group, Popover } from '@mantine/core'
import { hsv2rgb, hsl2hsv } from 'helpers/colorHelpers';
import { useDidUpdate, useDebouncedValue } from '@mantine/hooks';

const MultiLightColor = props => {

    const [open, setOpen] = useState(false);
    const states = useDeviceStateStore(state => Object.fromEntries(props.endpointIds.filter(key => key in state.deviceStates).map(key => [key, state.deviceStates[key]])), (oldState, newState) => compareState(oldState, newState))  
    const [ value, setValue ] = useState(undefined)
    const [ retainBrightness, setRetainBrightness] = useState(true)
    const [ debounced ] = useDebouncedValue( value, props.delay ? props.delay : 300 );

    useEffect(() => {
        register(props.endpointIds, 'MultiLightColor')
        return function cleanup() {
            unregister(props.endpointIds, 'MultiLightColor');
        };
    // eslint-disable-next-line 
    }, [])    

    useDidUpdate(() => {
        if (debounced !== undefined) {
            console.log('>> sending value change', debounced)
            var hsb = {...debounced}
            hsb.saturation = hsb.saturation/100
            for (var light in states) {
                if (retainBrightness) {
                    hsb.brightness=states[light].BrightnessController.brightness.value/100
                }
                console.log('sending hsb', hsb)
                directive(light, 'ColorController', 'SetColor', { "color" : hsb }, {})
            }
        }
    }, [ debounced ])

    if (!states) { return null }

    function currentAverage() {
        var avgHue=0
        var avgSat=0
        var avgBri=0

        for (var light in states) {
            var col = states[light].ColorController.color.value
            avgHue += col['hue']
            avgSat += col['saturation']           
            if (states[light].PowerController.powerState.value==='ON') {
                avgBri+=col['brightness']  
            }
        }
        var count=Object.keys(states).length
        avgHue = avgHue/count
        avgSat = avgSat/count
        avgBri = avgBri/count
        var result={"hue": avgHue, "saturation": avgSat, "brightness": avgBri }
        return hsv2rgb(result)
    }

    function handleColorChange(newColorString) {
        const color = hsl2hsv(newColorString)
        console.log('post div',color)
        var hsb={"hue":color[0], "saturation": color[1], "brightness":color[2]};
        console.log('post div',hsb)
        setValue(hsb)
    }

    const currentHex = currentAverage()
    
    return (
        <Popover
                opened={open}
                onClose={() => setOpen(false)}
                position="bottom"
                placement="start"
                withArrow
                noFocusTrap
                noEscape
                transition="pop-top-left"
                target={<ColorSwatch radius="md" color={currentHex} onClick={ () => setOpen(true) } />}
            >
                <Group direction="column">
                    <ColorPicker value={currentAverage() } format="hsl" 
                                    onChange={ handleColorChange }
                                    swatches= { [ '#D0021B', '#F5A623', '#F8E71C', '#8B572A', '#7ED321', '#417505', '#BD10E0', '#9013FE', 
                                                '#4A90E2', '#50E3C2', '#B8E986', '#FFFFFF', "#FEEBBA" ] }
                    />
                    <Checkbox label="Retain brightness" checked={retainBrightness} onChange={(event) => setRetainBrightness(event.currentTarget.checked)} />
                </Group>
        </Popover>
    );

}

export default MultiLightColor

