import React, { useState } from 'react';
import { directive } from 'store/directive'
import { Checkbox, ColorPicker, Group, HueSlider, Popover } from '@mantine/core'
import { hsv2rgb, hsl2hsv } from 'beta/helpers/colorHelpers'
import { useDidUpdate, useDebouncedValue } from '@mantine/hooks';

const LightPopover = props => {

    const light = props.light
    const [ value, setValue ] = useState(undefined)
    const [ retainBrightness, setRetainBrightness] = useState(true)
    const [ debounced ] = useDebouncedValue( value, props.delay ? props.delay : 300 ); 

    useDidUpdate(() => {
        if (debounced !== undefined) {
            console.log('>> sending value change', debounced)
            var hsb = {...debounced}
            hsb.saturation = hsb.saturation/100
            if (retainBrightness) {
                hsb.brightness=light.BrightnessController.brightness.value/100
            }
            console.log('sending hsb', hsb)
            directive(props.endpointId, 'ColorController', 'SetColor', { "color" : hsb }, {})
        }
    }, [ debounced ])

    if (!light) { return null }

    const currentColor = light.ColorController ? light.ColorController.color.value : undefined
    const currentHexColor = currentColor ? hsv2rgb(currentColor) : undefined
    
    function handleColorChange(newColorString) {
        const color = hsl2hsv(newColorString)
        console.log('post div',color)
        var hsb={"hue":color[0], "saturation": color[1], "brightness":color[2]};
        console.log('post div',hsb)
        setValue(hsb)
    }

    function handleHueChange(newColor) {
        console.log('current', currentColor)
        const color = {...currentColor, "hue": newColor}
        setValue(color)
    }

    return (
        <Popover
                opened={props.open}
                onClose={() => props.setOpen(false)}
                position="bottom"
                placement="start"
                withArrow
                noFocusTrap
                noEscape
                transition="pop-top-left"
                target={ props.target }
            >
                <Group direction="column">
                    { retainBrightness ?
                        <HueSlider value={currentColor} format="hsl" onChange={handleHueChange } style={{ width: "100%"}} />
                    :
                        <ColorPicker value={currentHexColor } format="hsl" 
                                    onChange={ handleColorChange }
                                    swatches= { [ '#D0021B', '#F5A623', '#F8E71C', '#8B572A', '#7ED321', '#417505', '#BD10E0', '#9013FE', 
                                                '#4A90E2', '#50E3C2', '#B8E986', '#FFFFFF', "#FEEBBA" ] }
                        />
                    }
                    <Checkbox label="Retain brightness" checked={retainBrightness} onChange={(event) => setRetainBrightness(event.currentTarget.checked)} />
                </Group>
        </Popover>
    );

}

export default LightPopover

