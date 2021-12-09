import React, { useState } from 'react';
import { Slider } from '@mantine/core';
import { useDidUpdate, useDebouncedValue } from '@mantine/hooks';
import { useMantineTheme } from '@mantine/core';

const CardLineSlider = props => {

    const theme = useMantineTheme(); 
    const [ volume, setVolume ] = useState(props.value)
    const [debounced] = useDebouncedValue( volume, 300);

    useDidUpdate(() => {
        setVolume(props.value)
    }, [ props.value ])

    useDidUpdate(() => {
        if (debounced !== undefined) {
            console.log('>> sending volume change', debounced)
            props.change(debounced)
        }
    }, [ debounced ])

    const extraPad = makeLevels() !== undefined
    console.log('make', extraPad)

    const disabled = theme.colorScheme === 'dark' ? 
                        { 
                            root: { padding: extraPad ? "8px 8px 16px 8px" : undefined },
                            track: { backgroundColor: theme.colors.dark[7] }, 
                            bar: { backgroundColor: theme.colors.dark[4] }, 
                            mark: { backgroundColor:  theme.colors.dark[6], borderColor: theme.colors.dark[4] },
                            markFilled: { backgroundColor:  theme.colors.dark[6], borderColor: theme.colors.dark[3] },
                            thumb: { backgroundColor:  theme.colors.dark[6], borderColor: theme.colors.dark[3] } }
                        :
                        {   root: { padding: extraPad ? "8px 8px 16px 8px" : undefined },
                            track: { backgroundColor: theme.colors.gray[1] }, 
                            bar: { backgroundColor: theme.colors.gray[4] }, 
                            thumb: { backgroundColor:  theme.colors.gray[1], borderColor: theme.colors.gray[4] } }

    function makeLevels() {
        if (!props.levelValues) { return undefined}
         //   { return [{ "value": 0, "label": 0 }, { "value": 100, "label": 100 }] }
        var all_levels=[]
        for (var i = 0; i < props.levelValues.length; i++) {
            all_levels.push({ "value": props.levelValues[i], "label": props.levelValues[i] })
        }
        return all_levels
    }   

    return (
        <Slider
            style={{ boxSizing: "border-box", width: "100%", maxWidth: "100%" }}
            styles={ props.on ? {root: { padding: extraPad ? "16px 8px 32px 8px" : undefined }} : disabled }
            onChange={ (val) => setVolume(val) }
            value={ volume }
            min={ props.levelValues ? props.levelValues[0] : 0 }
            max={ props.levelValues ? props.levelValues[props.levelValues.length-1] : 100 }    
            step={ props.levelValues ? null : 1 }
            disabled = { !props.on  }
            marks={ makeLevels() }
        />
    )
}

export default CardLineSlider