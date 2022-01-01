
import { useState } from 'react';
import { useDidUpdate, useDebouncedValue } from '@mantine/hooks';

export const useDisplayValue = ( realValue, apply, delay ) => {

    // UseDisplayValue allows controls on the page to be toggled rather than waiting for the underlying device to respond first.  This is especially important
    // when turning off lights in a layout as they 'blink' out instead of toggling off first from a user perspective.
    // This should also replace the built-in code in CardLineSlider at some point.

    // TODO - confirm that realValue stays updated and if not, add an update function to apply non-user changes when needed

    const [ valueSetByUser, setValueSetByUser] = useState(false)
    const [ displayValue, setDisplayValue] = useState(realValue)
    const [ debounced ] = useDebouncedValue( displayValue, delay ? delay : 300 );

    useDidUpdate(() => {
        setValueSetByUser(false)
        setDisplayValue(realValue)
    }, [ realValue ])

    useDidUpdate(() => {
        if (debounced !== undefined && valueSetByUser) {
            console.log('>> sending value change', debounced)
            apply(debounced)
        }
    }, [ debounced ])

    const change = newValue => {
        var workingValue = newValue
        try {
            if (newValue.constructor.name === 'SyntheticBaseEvent') {
                if (newValue.target.hasOwnProperty('checked')) {
                    workingValue = newValue.target.checked
                } else {
                    // If there are other types of events we want to handle as part of this
                    // hook we should develop them here as needed
                    console.log('!! unhandled newValue event target', newValue.target)
                }
            }
        }
        catch {
            workingValue = newValue
        }
        setValueSetByUser(true)
        setDisplayValue(workingValue)
    }

    return { displayValue, change }

}

export default useDisplayValue