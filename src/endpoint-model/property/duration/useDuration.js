import { useEffect } from 'react';

const useTimeRange = ( endpointId, value, directive) => {

    const activeDirective = directive
    const duration = value?.duration || 5

    useEffect(() => {
        // set default in activity editor
        if (directive && value === undefined) {
            setDuration(5)
        }
    // eslint-disable-next-line 
    }, [  ]);   

 
    const setDuration = newDuration => {
        activeDirective(endpointId, "Sofa.LogicController", "setDuration", { "duration": newDuration })
    }

    const durationLabel = duration + "s"

    return { duration, durationLabel, setDuration}

}

export default useTimeRange;
