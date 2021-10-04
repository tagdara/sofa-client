import React, { useContext, useState, useEffect } from 'react';

import ComputerIcon from '@material-ui/icons/Computer';

import { DataContext } from 'DataContext/DataProvider';
import ErrorBoundary from 'error/ErrorBoundary';
import Computer from 'devices/Computer/Computer';
import Device from 'devices/Device';
import GridSection from 'components/GridSection';
import Matrix from 'devices/Matrix/Matrix';


export default function ComputerLayout(props) {

    const { cardReady, unregisterDevices, getEndpointIdsByFriendlyName, getEndpointIdsByCategory, devices, deviceStates, deviceState, directive } = useContext(DataContext);
    const [switches, setSwitches]=useState([])
    const [otherDevices, setOtherDevices]=useState([])
    const [computers, setComputers]=useState([])
    const matrixDeviceNames=['Living Room TV', 'Office 1', 'Office 2', 'Office 3', 'Office 4', 'Downstairs 1', 'Downstairs 2', 'Rack']
    const plugDeviceNames=['3D Printer']
    const [matrixDevices, setMatrixDevices]=useState([])

    useEffect(() => {
        var computerEndpoints=getEndpointIdsByCategory('COMPUTER', 'ComputerLayout')
        var otherEndpointIds=getEndpointIdsByCategory('OTHER', 'ComputerLayout')
        var switchesEndpointIds=getEndpointIdsByCategory('SMARTPLUG', 'ComputerLayout')
        var printers=getEndpointIdsByFriendlyName(plugDeviceNames, 'ComputeLayout', false)
        var matrixEndpointIds=getEndpointIdsByFriendlyName(matrixDeviceNames, 'ComputerLayout', false)
        setComputers(computerEndpoints)
        setOtherDevices(otherEndpointIds)
        
        setSwitches([...switchesEndpointIds, ...printers])
        setMatrixDevices(matrixEndpointIds)
        
        console.log('computers', computerEndpoints,computers)
        
        return function cleanup() {
            unregisterDevices('ComputerLayout');
        };
    // eslint-disable-next-line     
    }, [])

    //console.log(cardReady('ComputerLayout', ['pc1:pc:pc1', 'pc2:pc:pc2', 'pc3:pc:p3', 'pc4:pc:pc4']))

    return (
        cardReady('ComputerLayout', ['pc1:windows', 'pc2:windows', 'pc3:pc:pc3', 'pc4:pc:pc4']) ?
        <React.Fragment>

            <GridSection name={"Computers"} show={true}>
                <ErrorBoundary wide={props.wide}>
                    { computers.map((device) =>
                        <Computer key={ device } device={ devices[device] } deviceState={ deviceState(device) } directive={ directive }  />
                    )}
                </ErrorBoundary>
            </GridSection>

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

