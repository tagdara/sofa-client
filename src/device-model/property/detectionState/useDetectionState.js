import { useRegister } from 'store/useRegister'

const useDetectionState = (endpointId, value, directive, userSensorType) => {

    const { deviceState } = useRegister(endpointId)

    const getSensorType = () => {
        if (userSensorType && deviceState.hasOwnProperty(userSensorType)) { return userSensorType }
        if (deviceState.hasOwnProperty('MotionSensor')) { return 'MotionSensor'}
        if (deviceState.hasOwnProperty('ContactSensor')) { return 'ContactSensor'}
        return undefined
    }

    const sensorType = getSensorType()
    const selections =[{ label: "Detected", value: "DETECTED"}, { label: "Not Detected", value: "NOT_DETECTED"}]

    const stateDetectionState = sensorType && deviceState && deviceState[sensorType] ? 
                                deviceState[sensorType].detectionState : 
                                null

    const detectionState = value !== undefined ? value : stateDetectionState

    const setDetectionState = value => {
        // Can't set detection state on a real object but this is used in the
        // activity editor to set triggers and conditions
        directive(endpointId, sensorType, "SetDetectionState", { detectionState: value } )
    }
    
    const detectionStateLabel = detectionState === "NOT_DETECTED" ? "Not detected" : "Detected"
    const detectionStateBool = detectionState === "NOT_DETECTED"

    // set default in activity editor
    if (directive && value === undefined) {
        setDetectionState(stateDetectionState)
    }

    return { detectionState, detectionStateBool, detectionStateLabel, setDetectionState, selections }

}

export default useDetectionState
