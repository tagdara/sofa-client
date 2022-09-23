import useTemperatureSensor from 'endpoint-model/controller/TemperatureSensor/useTemperatureSensor'

const useTemperature = ( endpointId, value, directive) => {

    const { temperature, temperatureLabel, temperatureColor, setTemperature } = useTemperatureSensor(endpointId, value, directive)

    return { temperature, temperatureLabel, temperatureColor, setTemperature }

}

export default useTemperature
