import { useEffect } from 'react';
import { useRegister } from 'endpoint-model/register/useRegister'
import { directive as storeDirective } from 'store/directive'

const usePowerLevel = ( endpointId, value, directive) => {

    const controller = "Alexa.PowerLevelController"
    const { deviceState } = useRegister(endpointId)
    const activeDirective = directive || storeDirective
    const statePowerLevel = deviceState?.[controller]?.powerLevel?.value
    const powerLevel = value?.powerLevel !== undefined ? value.powerLevel : statePowerLevel

    useEffect(() => {
        // set default in activity editor
        if (directive && value === undefined) {
            setPowerLevel(statePowerLevel)
        }
    // eslint-disable-next-line 
    }, [  ]);

    const setPowerLevel = newPowerLevel => {
        activeDirective(endpointId, controller, "SetPowerLevel", {"powerLevel": newPowerLevel})
    }
    
    const increasePowerLevel  = amount => {
        // These have alexa equivalents that should be implemented properly
        const newPowerLevel = powerLevel + amount
        setPowerLevel(newPowerLevel)
    }

    const decreasePowerLevel  = amount => {
        // These have alexa equivalents that should be implemented properly
        const newPowerLevel = powerLevel - amount
        setPowerLevel(newPowerLevel)
    }

    const powerLevelLabel = powerLevel + "%"

    return { powerLevel, powerLevelLabel, setPowerLevel, increasePowerLevel, decreasePowerLevel }

}

export default usePowerLevel;
