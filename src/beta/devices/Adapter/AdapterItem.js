import React from 'react';
import Moment from 'react-moment';
import 'moment-timezone';
import { directive } from 'store/directive'
import { ActionIcon } from '@mantine/core'
import { Layers, RotateCcw, Square } from 'react-feather'
import { SplitButtonGroup, SplitButton } from 'beta/components/SplitButton'
import { useRegister } from 'store/useRegister'

export default function AdapterItem(props) { 


    const { device, deviceState } = useRegister(props.endpointId)
    if (!deviceState) { console.log('dead adapter', props.endpointId); return null }

    function getErrorState(count) {
        try {

            if (deviceState.PowerController.powerState.value==='OFF') {
                return 'gray'
            }
            
            if (deviceState.AdapterHealth.hasOwnProperty('errors')) {
                if (deviceState.AdapterHealth.errors.value > count) {
                    return 'red'
                } else {
                    return 'green'
                }
            } else {
                return 'gray'
            }
        }
        catch {
            return 'gray'
        }
    }

//    function getErrorCount() {
 //       try {
//            if (deviceState.AdapterHealth.hasOwnProperty('errors')) {
//                return "Errors: "+deviceState.AdapterHealth.errors.value
//            } else {
//                return "No Errors"
//            }
//        }
//        catch {
//            return ""
//        }
//    }

//    function getDataSize() {
//        try {
//            if (deviceState.AdapterHealth.hasOwnProperty('datasize')) {
//                return "/ Data: "+deviceState.AdapterHealth.datasize.value
///            } else {
 //               return ""
 //           }
//        }
 //       catch {
 //           return ""
 //       }
 //   }

    
    function getStartupDate() {
        try {
            if (deviceState.AdapterHealth.startup.value) {
                if (deviceState.AdapterHealth.startup.value==="Remote") { return "Remote" }
                return <Moment format="ddd MMM D h:mm:sa">{deviceState.AdapterHealth.startup.value}</Moment>
            }
        } 
        catch {}
        return "Not started"
    }


    function getActiveState() {
        try {
            if (deviceState.ServiceController.activeState.value!=="unknown") {
                return " ("+deviceState.ServiceController.activeState.value+")"
            }
        }
        catch {}
        return ""
    }

//    <SofaListItem   button={true} onClick={ () => window.open(deviceState.AdapterHealth.url.value, '_'+device.friendlyName) }
//    avatarState={ getErrorState(5) } avatar={device.friendlyName.charAt()}
//    primary={ device.friendlyName + getActiveState() } secondary={deviceState.AdapterHealth.url.value}
//   />

    return (
        <SplitButtonGroup>
            <SplitButton >
                <ActionIcon color={ getErrorState(5) } onClick={ () => directive(props.endpointId, "PowerController", 'TurnOn')} >
                    <Layers size={20} />
                </ActionIcon>               
            </SplitButton>
            <SplitButton  label={ device.friendlyName + getActiveState() } secondary={ getStartupDate() } />
            { getStartupDate()!=='Remote' && 
                <SplitButton>
                    <ActionIcon onClick={ () => directive(props.endpointId, "PowerController", 'TurnOn')} >
                        <RotateCcw size={20} />
                    </ActionIcon>
                    <ActionIcon onClick={ () => directive(props.endpointId, "PowerController", 'TurnOff')} >
                        <Square size={16} />
                    </ActionIcon>
                </SplitButton>
            }
        </SplitButtonGroup>
    );
}

