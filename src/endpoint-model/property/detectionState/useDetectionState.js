import { useEffect } from 'react';
import { useRegister } from 'endpoint-model/register/useRegister'

const useDetectionState = (endpointId, value, directive, userSensorType) => {

    const { deviceState } = useRegister(endpointId)

    const getSensorController = () => {
        if (!deviceState) { return undefined }
        if (userSensorType && deviceState?.[userSensorType]) { return userSensorType }
        if (deviceState?.['Alexa.MotionSensor']) { return 'Alexa.MotionSensor'}
        if (deviceState?.['Alexa.ContactSensor']) { return 'Alexa.ContactSensor'}
        return undefined
    }

    const controller = getSensorController()
    const selections =[{ label: "Detected", value: "DETECTED"}, { label: "Not Detected", value: "NOT_DETECTED"}]
    const stateDetectionState = deviceState?.[controller]?.detectionState?.value
    const detectionState = value?.detectionState || stateDetectionState

    useEffect(() => {
        // set default in activity editor
        if (directive && value === undefined) {
            setDetectionState(stateDetectionState)
        }
    // eslint-disable-next-line 
    }, [  ]);   

    const setDetectionState = value => {
        // Can't set detection state on a real object but this is used in the
        // activity editor to set triggers and conditions
        directive(endpointId, controller, "SetDetectionState", { detectionState: value } )
    }
    
    const detectionStateLabel = detectionState === "NOT_DETECTED" ? "Not detected" : "Detected"
    const detectionStateBool = detectionState === "DETECTED"

    return { detectionState, detectionStateBool, detectionStateLabel, setDetectionState, selections }

}

export default useDetectionState
