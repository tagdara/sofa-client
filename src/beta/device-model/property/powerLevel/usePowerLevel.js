import { useRegister } from 'store/useRegister'
import { directive } from 'store/directive'

const usePowerLevel = endpointId => {

    const { deviceState } = useRegister(endpointId)
    const powerLevel = deviceState && deviceState.hasOwnProperty('PowerLevelController') ? deviceState.PowerLevelController.powerLevel.value : undefined

    const setPowerLevel = newPowerLevel => {
        directive(endpointId, "PowerLevelController", "SetPowerLevel", {"powerLevel": newPowerLevel})
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
