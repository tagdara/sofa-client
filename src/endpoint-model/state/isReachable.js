

export function isReachable(deviceState) {
    // requires devicestate to prevent subscription in the helper
    return deviceState?.["Alexa.EndpointHealth"]?.connectivity?.value?.value==='OK'
}