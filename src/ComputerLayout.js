import React, { useContext, useState, useEffect } from 'react';
import { DataContext } from './DataContext/DataProvider';
import ErrorBoundary from './ErrorBoundary';
import Computer from './other/Computer';
import Device from './other/Device';
import GridSection from './GridSection';
import Matrix from './other/Matrix';
import ComputerIcon from '@material-ui/icons/Computer';

export default function ComputerLayout(props) {

    const { cardReady, unregisterDevices, getEndpointIdsByFriendlyName, getEndpointIdsByCategory, devices, deviceStates, directive } = useContext(DataContext);
    const [switches, setSwitches]=useState([])
    const [otherDevices, setOtherDevices]=useState([])
    const computers=[]
    //const [computers, setComputers]=useState([])
    const matrixDeviceNames=['Living Room TV', 'Office 1', 'Office 2', 'Office 3', 'Office 4', 'Downstairs 1', 'Downstairs 2', 'Rack']
    const [matrixDevices, setMatrixDevices]=useState([])

    useEffect(() => {
        //var computerEndpoints=getEndpointIdsByCategory('COMPUTER', 'ComputerLayout')
        var otherEndpointIds=getEndpointIdsByCategory('OTHER', 'ComputerLayout')
        var switchesEndpointIds=getEndpointIdsByCategory('SMARTPLUG', 'ComputerLayout')
        var matrixEndpointIds=getEndpointIdsByFriendlyName(matrixDeviceNames, 'ComputerLayout', false)
        //setComputers(computerEndpoints)
        setOtherDevices(otherEndpointIds)
        setSwitches(switchesEndpointIds)
        setMatrixDevices(matrixEndpointIds)
        
        return function cleanup() {
            unregisterDevices('ComputerLayout');
        };
    // eslint-disable-next-line     
    }, [])
    
 
    return (
        cardReady('ComputerLayout') ?
        <React.Fragment>
            <GridSection name={"Plugs"} >
                <ErrorBoundary wide={props.wide}>
                    { switches.map(device =>
                        <Device key={ device } nested={props.nested} icon={<ComputerIcon />}  device={ devices[device] } deviceState={ deviceStates[device] } directive={directive} />
                    )}
                </ErrorBoundary>

            </GridSection>
            <GridSection name={"Display Matrix"} >
                <ErrorBoundary wide={props.wide}>
                    { matrixDevices.map(device =>
                        <Matrix key={ device } device={ devices[device] } deviceState={ deviceStates[device] } directive={directive} />
                    )}
                </ErrorBoundary>
            </GridSection>
            
            <GridSection name={"Computers"} show={false}>
                <ErrorBoundary wide={props.wide}>
                    { computers.map((device) =>
                        <Computer key={ device } device={ device } directive={props.directive} />
                    )}
                </ErrorBoundary>
            </GridSection>

            <GridSection name={"Services"} show={false}>
                <ErrorBoundary wide={props.wide}>
                    { otherDevices.map(device =>
                        <Device key={ device } nested={props.nested} icon={props.icon} device={ devices[device] } deviceState={ deviceStates[device] } directive={directive} />
                    )}
                </ErrorBoundary>
            </GridSection>
        </React.Fragment>
        :
        null
    )
}

