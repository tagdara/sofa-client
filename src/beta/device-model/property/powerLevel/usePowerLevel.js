import { useRegister } from 'store/useRegister'
import { directive as storeDirective } from 'store/directive'

const usePowerLevel = ( endpointId, value, directive) => {

    const { deviceState } = useRegister(endpointId)
    const activeDirective = directive ? directive : storeDirective
    const statePowerLevel = deviceState && deviceState.hasOwnProperty('PowerLevelController') ? deviceState.PowerLevelController.powerLevel.value : undefined
    const userValue = value && value.powerLevel && value.powerLevel.value ? value.powerLevel.value : undefined
    const powerLevel = userValue ? userValue : statePowerLevel

    const setPowerLevel = newPowerLevel => {
        activeDirective(endpointId, "PowerLevelController", "SetPowerLevel", {"powerLevel": newPowerLevel})
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
