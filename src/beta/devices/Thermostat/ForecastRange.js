import React, { useEffect } from 'react';
import useDeviceStateStore from 'store/deviceStateStore'
import { register, unregister } from 'store/deviceHelpers'
import { Group, Slider } from '@mantine/core';

export default function ForecastAvatar(props) { 

    const forecastDeviceState = useDeviceStateStore( state => state.deviceStates[props.endpointId] )
    const currentDeviceState = useDeviceStateStore( state => state.deviceStates[props.currentTemp] )

    useEffect(() => {
        register(props.endpointId, 'forecastavatar-'+props.endpointId)
        register(props.currentTemp, 'forecastavatar-'+props.endpointId)
        return function cleanup() {
            unregister(props.endpointId, 'forecastavatar-'+props.endpointId);
            unregister(props.currentTemp, 'forecastavatar-'+props.endpointId);
        };
    // eslint-disable-next-line 
    }, [ ] )
    
    function getForecastHigh() {
        try {
            return forecastDeviceState['Forecast High'].rangeValue.value
        }
        catch {
            return undefined
        }
    }

    function getForecastLow() {
        try {
            return forecastDeviceState['Forecast Low'].rangeValue.value
        }
        catch {
            return undefined
        }
    }

    const tempColor = ( temp ) => {
        switch (true) {
            case (!temp):
                return 'gray'
            case (temp < 70): 
                return 'teal'
            case (temp < 75): 
                return 'green'
            case (temp < 90): 
                return 'orange'
            case (temp < 200): 
                return 'red'
            default:
                return 'gray'
        }
    }

    const currentTemp = currentDeviceState.TemperatureSensor.temperature.value.value
    const low = getForecastLow() !== undefined ? Math.min(getForecastLow(), currentTemp) : currentTemp
    const high = getForecastHigh() !== undefined ? Math.max(getForecastHigh(), currentTemp) : currentTemp
    const marks = [{ value: low, label: low+"°"}, { value: high, label: high+"°"}]

    return (
            <Slider style={{padding: "38px 8px 4px 8px", width: "25%"}}
                    size={2}
                    labelAlwaysOn min={low} max={high} value={currentTemp} marks={marks} 
                    styles={(theme) =>({
                        label: {
                            backgroundColor: theme.colors[tempColor(currentTemp)][9],
                            fontSize: 16,
                            fontWeight: 700,
                            top: "-40px",
                            padding: 8,
                        },
                        track: {
                          backgroundColor:
                            theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.blue[1],
                        },
                        mark: {
                          width: 5,
                          height: 5,
                          borderRadius: 4,
                          transform: 'translateX(-3px) translateY(-2px)',
                          borderColor: theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.blue[1],
                        },
                        markFilled: {
                          borderColor: theme.colors.blue[6],
                        },
                        markLabel: { fontSize: theme.fontSizes.xs, marginTop: -26 },
                        thumb: {
                          height: 6,
                          width: 6,
                          borderWidth: 0,
                          backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.blue[1],
                          boxShadow: theme.shadows.sm,
                        },
                      })}                    
            />
        );
}


